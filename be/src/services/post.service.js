const { prisma } =  require("../../lib/prisma");

function mapPostsAuthor(posts) {
    return posts.map((post) => {
        if (!post.author) return post;
        const username = post.author.email
            ? String(post.author.email).split("@")[0]
            : String(post.user_id).slice(0, 8);
        return {
            ...post,
            author: {
                ...post.author,
                username
            }
        };
    });
}

const postInclude = {
    author : {
        select: {
            email: true,
            full_name: true,
            avatar_url: true
        }
    }
};

async function getAllPosts(){
    try {
        const result = await prisma.post.findMany({
            include: postInclude,
            orderBy: {
                createdAt: "desc"
            }
        });
        return mapPostsAuthor(result);
    } catch (error) {
        throw new Error("Error fetching posts: " + error.message);
    }
}
async function getPostById(post_id){
    try {
        const result = await prisma.post.findUnique({
            where: {
                post_id: post_id
            }
        });
    return result;
    } catch (error) {
        throw new Error("Error fetching post: " + error.message);
    }
}
async function getPostsLimit(limit){
    try {
        const result = await prisma.post.findMany({
            take: Number(limit),
            include: postInclude,
            orderBy: {
                createdAt: "desc"
            }
        });
        return mapPostsAuthor(result);
    } catch (error) {
        throw new Error("Error fetching posts with limit: " + error.message);
    }
}

async function getPostsByUserId(userId, limit){
    try {
        const result = await prisma.post.findMany({
            where: {
                user_id: userId
            },
            include: postInclude,
            ...(limit ? { take: Number(limit) } : {}),
            orderBy: {
                createdAt: "desc"
            }
        });
        return mapPostsAuthor(result);
    } catch (error) {
        throw new Error("Error fetching posts by user: " + error.message);
    }
}

async function createNewPostOfUser(postData){
    try {
        const {user_id, place_id, content, image_url, created_at} = postData;
        const result = await prisma.post.create({
            data: {
                user_id,
                place_id,
                content,
                image_url,
                created_at
            }
        });
        return result;
    } catch (error) {
        throw new Error("Error creating new post: " + error.message);
    }
}

async function deletePost(postId){
    try {
        const result = await prisma.post.delete({
            where:{
                post_id: postId
            }
        })
        return result;
    } catch (error) {
        throw new Error("Error deleting post: "+ error.message)
    }
}
async function updatePost(post_id, {place_id, content, image_url}) {
    try {
        const result = await prisma.post.update({
            where: {
                post_id : post_id
            },
            data:{
                place_id : place_id,
                content: content,
                image_url : image_url,
            }
        })
    } catch (error) {
        throw new Error("Error updating post: "+ error.message)
    }
}

module.exports = {
    getAllPosts,
    getPostsByUserId,
    createNewPostOfUser,
    deletePost,
    updatePost,
    getPostById,
    getPostsLimit
} 