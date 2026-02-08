const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre')

async function getAllPosts(){
    const result = await db.query("SELECT * FROM Posts");
    return result.rows;

}
async function getPostById(post_id){
    const result = await db.query("SELECT * FROM Posts WHERE post_id = $1", [post_id]);
    return result.rows[0];
}

async function createNewPostOfUser(postData){
    const {user_id, place_id, content, image_url, created_at} = postData;
    const result = await db.query("INSERT INTO Posts (user_id, place_id, content, image_url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
    [user_id, place_id, content, image_url, created_at]);
    return result.rows[0];
}

async function deletePost(postId){
    console.log("Deleting post with ID:", postId);
    const result = await db.query("DELETE FROM Posts WHERE post_id = $1 RETURNING *", [postId]);

    return result.rows[0];
}
async function updatePost(post_id, {place_id, content, image_url, update_at}) {
    console.log("Updating post with ID:", post_id);
    const result = await db.query("UPDATE Posts set place_id = $1, content = $2, image_url = $3, update_at = $4 where post_id = $5", [place_id,content, image_url, update_at, post_id]);
    return result.rows[0];
}

module.exports = {
    getAllPosts,
    createNewPostOfUser,
    deletePost,
    updatePost,
    getPostById
}