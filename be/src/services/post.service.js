const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre')
const { prisma } =  require("../../lib/prisma");

async function getAllPosts(){
    try {
        const result = prisma.post.findMany();
        return result;
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
            take: limit
        });
        return result;
    } catch (error) {
        throw new Error("Error fetching posts with limit: " + error.message);
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
    createNewPostOfUser,
    deletePost,
    updatePost,
    getPostById,
    getPostsLimit
} 