const { prisma } = require('../lib/prisma');

async function getAllComments() {
    const data = await prisma.comment.findMany();
    return data;
}

async function getCommentByPostId(post_id) {
    const data = await prisma.comment.findMany({
        where: {
            post_id: post_id
        }
    });
    return data;
}
async function createNewComment(commentData) {
    const { user_id, post_id, content, created_at } = commentData;
    const result = await prisma.comment.create({
        data: {
            user_id,
            post_id,
            comment_text: content,
            created_at
        }
    });
    return result;
}
async function updateComment(comment_id, content) {
    try {       
        const result = await prisma.comment.update({
            where: {
                comment_id: comment_id
            },
            data: {
                comment_text: content
            }
        });
        return result;
    } catch (error) {
        throw new Error("Comment not found");
    }
}

async function deleteComment(comment_id) {
    try {
        const result = await prisma.comment.delete({
            where: {
                comment_id: comment_id
            }
        });
        return result;
    } catch (error) {
        throw new Error("Comment not found");
    }
}

module.exports = {
    getAllComments,
    getCommentByPostId,
    createNewComment,
    updateComment,
    deleteComment
}
