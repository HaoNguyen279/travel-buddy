const { verify_password } = require('../auth/password');
const { prisma } =  require("../../lib/prisma");

const publicUserSelect = {
    user_id: true,
    username: true,
    email: true,
    full_name: true,
    avatar_url: true,
    bio: true,
    createdAt: true,
    updatedAt: true
};

async function getAllUsers() {
    try {
        const result = await prisma.user.findMany({
            select: publicUserSelect
        });
        return result;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

async function getUserById(id) {
    try {
        const result = await prisma.user.findUnique({
            where: {
                user_id: id
            },
            select: publicUserSelect
        });
        return result;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

async function getUserProfileById(targetUserId, viewerUserId = null) {
    try {
        const user = await prisma.user.findUnique({
            where: { user_id: targetUserId },
            select: publicUserSelect
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
                    u."username",
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
            items,
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
                    u."username",
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
            items,
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
    try {
        const result = await prisma.user.update({
            where: {
                user_id: userdata.user_id
            },
            data: {
                username: userdata.username,
                email: userdata.email,
                password_hash: userdata.password_hash,
                full_name: userdata.full_name,
                avatar_url: userdata.avatar_url,
                bio: userdata.bio
            }
        });
        return result;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
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
    updateUser
}