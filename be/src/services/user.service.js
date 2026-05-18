const { verify_password } = require('../auth/password');
const { prisma } =  require("../../lib/prisma");

function buildUsername(user) {
    if (user?.email && typeof user.email === "string") {
        return user.email.split("@")[0];
    }
    return String(user?.user_id || "user").slice(0, 8);
}

const publicUserSelect = {
    user_id: true,
    email: true,
    full_name: true,
    avatar_url: true,
    bio: true,
    createdAt: true,
    updatedAt: true,
    is_admin: true
};

const privateUserSelect = {
    ...publicUserSelect,
    phone: true
};

async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            select: publicUserSelect
        });
        return users.map((user) => ({
            ...user,
            username: buildUsername(user)
        }));
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

async function getUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: id
            },
            select: publicUserSelect
        });
        if (!user) return null;
        return {
            ...user,
            username: buildUsername(user)
        };
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

async function getUserProfileById(targetUserId, viewerUserId = null) {
    try {
        const user = await prisma.user.findUnique({
            where: { user_id: targetUserId },
            select: viewerUserId === targetUserId ? privateUserSelect : publicUserSelect
        });
        if (!user) return null;

        const [postsCount, followersRaw, followingRaw, followStateRaw] = await Promise.all([
            prisma.post.count({ where: { user_id: targetUserId } }),
            prisma.$queryRaw`
                SELECT COUNT(*)::int AS count
                FROM "user_follows"
                WHERE "following_id" = ${targetUserId}
            `,
            prisma.$queryRaw`
                SELECT COUNT(*)::int AS count
                FROM "user_follows"
                WHERE "follower_id" = ${targetUserId}
            `,
            viewerUserId
                ? prisma.$queryRaw`
                    SELECT EXISTS(
                        SELECT 1
                        FROM "user_follows"
                        WHERE "follower_id" = ${viewerUserId}
                          AND "following_id" = ${targetUserId}
                    ) AS is_following
                `
                : Promise.resolve([{ is_following: false }])
        ]);

        return {
            ...user,
            username: buildUsername(user),
            stats: {
                posts: postsCount,
                followers: Number(followersRaw?.[0]?.count ?? 0),
                following: Number(followingRaw?.[0]?.count ?? 0)
            },
            is_following: Boolean(followStateRaw?.[0]?.is_following)
        };
    } catch (error) {
        throw new Error("Error fetching user profile: " + error.message);
    }
}

async function followUser(followerId, followingId) {
    if (followerId === followingId) {
        throw new Error("You cannot follow yourself");
    }

    try {
        const targetUser = await prisma.user.findUnique({
            where: { user_id: followingId },
            select: { user_id: true }
        });
        if (!targetUser) {
            throw new Error("Target user not found");
        }

        const inserted = await prisma.$executeRaw`
            INSERT INTO "user_follows" ("follower_id", "following_id", "created_at")
            VALUES (${followerId}, ${followingId}, NOW())
            ON CONFLICT ("follower_id", "following_id") DO NOTHING
        `;

        return inserted > 0;
    } catch (error) {
        throw new Error("Error following user: " + error.message);
    }
}

async function unfollowUser(followerId, followingId) {
    try {
        const deleted = await prisma.$executeRaw`
            DELETE FROM "user_follows"
            WHERE "follower_id" = ${followerId}
              AND "following_id" = ${followingId}
        `;
        return deleted > 0;
    } catch (error) {
        throw new Error("Error unfollowing user: " + error.message);
    }
}

async function getFollowersByUserId(userId, limit = 20, offset = 0) {
    try {
        const [items, totalRaw] = await Promise.all([
            prisma.$queryRaw`
                SELECT
                    u."user_id",
                    u."email",
                    u."full_name",
                    u."avatar_url",
                    uf."created_at"
                FROM "user_follows" uf
                JOIN "User" u ON u."user_id" = uf."follower_id"
                WHERE uf."following_id" = ${userId}
                ORDER BY uf."created_at" DESC
                LIMIT ${limit}
                OFFSET ${offset}
            `,
            prisma.$queryRaw`
                SELECT COUNT(*)::int AS count
                FROM "user_follows"
                WHERE "following_id" = ${userId}
            `
        ]);

        return {
            items: items.map((item) => ({
                ...item,
                username: item.email ? String(item.email).split("@")[0] : String(item.user_id).slice(0, 8)
            })),
            total: Number(totalRaw?.[0]?.count ?? 0)
        };
    } catch (error) {
        throw new Error("Error fetching followers: " + error.message);
    }
}

async function getFollowingByUserId(userId, limit = 20, offset = 0) {
    try {
        const [items, totalRaw] = await Promise.all([
            prisma.$queryRaw`
                SELECT
                    u."user_id",
                    u."email",
                    u."full_name",
                    u."avatar_url",
                    uf."created_at"
                FROM "user_follows" uf
                JOIN "User" u ON u."user_id" = uf."following_id"
                WHERE uf."follower_id" = ${userId}
                ORDER BY uf."created_at" DESC
                LIMIT ${limit}
                OFFSET ${offset}
            `,
            prisma.$queryRaw`
                SELECT COUNT(*)::int AS count
                FROM "user_follows"
                WHERE "follower_id" = ${userId}
            `
        ]);

        return {
            items: items.map((item) => ({
                ...item,
                username: item.email ? String(item.email).split("@")[0] : String(item.user_id).slice(0, 8)
            })),
            total: Number(totalRaw?.[0]?.count ?? 0)
        };
    } catch (error) {
        throw new Error("Error fetching following list: " + error.message);
    }
}

async function deleteUserById(id) {
    try {
        const result = await prisma.user.delete({
            where: {
                user_id: id
            }
        });
        return result;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
}
async function updateUser(userdata) {
    const {
        user_id,
        full_name,
        avatar_url,
        bio,
        phone
    } = userdata || {};

    if (!user_id) {
        throw new Error("User ID is required");
    }

    const data = {};
    if (full_name !== undefined) {
        const normalizedFullName = typeof full_name === "string" ? full_name.trim() : null;
        data.full_name = normalizedFullName || null;
    }
    if (avatar_url !== undefined) {
        const normalizedAvatar = typeof avatar_url === "string" ? avatar_url.trim() : null;
        data.avatar_url = normalizedAvatar || null;
    }
    if (bio !== undefined) {
        const normalizedBio = typeof bio === "string" ? bio.trim() : null;
        data.bio = normalizedBio || null;
    }
    if (phone !== undefined) {
        const normalizedPhone = typeof phone === "string" ? phone.trim() : null;
        data.phone = normalizedPhone || null;
    }

    if (Object.keys(data).length === 0) {
        throw new Error("No profile fields provided");
    }

    try {
        const result = await prisma.user.update({
            where: {
                user_id
            },
            data,
            select: privateUserSelect
        });
        return {
            ...result,
            username: buildUsername(result)
        };
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
}

async function updateMyProfileById(userId, payload) {
    return updateUser({
        user_id: userId,
        ...payload
    });
}

const createNewUser = async (username, email, hashed_password, full_name, avatar_url, bio) =>{
    try {
        const result = await prisma.user.create({
            data: {
                username,
                email,
                password_hash: hashed_password,
                full_name,
                avatar_url,
                bio
            }
        });
        return result;
    } catch (error) {
        throw new Error("Error creating new user: " + error.message);
    }
}
const createNewGoogleUser = async (firebase_uid, email, full_name, avatar_url, phone) =>{
    try {
        const result = await prisma.user.create({
            data: {
                firebase_uid:firebase_uid,
                email: email,
                full_name: full_name,
                avatar_url: avatar_url,
                phone: phone
            }
        });
        return result;
    } catch (error) {
        throw new Error("Error creating new user: " + error.message);
    }
}


const verifyLoginUser = async (email, text_password) =>{
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) return false;

        const isCorrectPassword = await verify_password(text_password, user.password_hash);
        if (isCorrectPassword) {
            delete user.password_hash;
            return user;
        }
        return false;
    } catch (error) {
        throw new Error("Error verifying user login: " + error.message);
    }
}

const findUserByUid = async (uid) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                firebase_uid: uid
            }
        });
        return user;
    } catch (error) {
            throw new Error("Error finding user by UID: " + error.message);
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    } catch (error) {
        throw new Error("Error finding user by email: " + error.message);
    }
}

const linkUserWithFirebaseUid = async (userId, firebaseUid) => {
    try {
        const result = await prisma.user.update({
            where: {
                user_id: userId
            },
            data: {
                firebase_uid: firebaseUid
            }
        });
        return result;
    } catch (error) {
        throw new Error("Error linking user with Firebase UID: " + error.message);
    }
}





module.exports = {
    getAllUsers,
    getUserById,
    getUserProfileById,
    followUser,
    unfollowUser,
    getFollowersByUserId,
    getFollowingByUserId,
    createNewUser,
    verifyLoginUser,
    deleteUserById,
    updateUser,
    updateMyProfileById,
    findUserByUid,
    findUserByEmail,
    linkUserWithFirebaseUid,
    createNewGoogleUser
}