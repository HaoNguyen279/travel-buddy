const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre')

async function getAllPosts(){
    // const pool = await poolPromise;
    // const result = await pool.request()
    //     .query("SELECT * FROM Posts");
    // return result.recordset;
    const result = await db.query("SELECT * FROM Posts");
    return result.rows;

}

async function getAllPostsOfUser(userId){
    const result = await db.query("SELECT * FROM Posts WHERE user_id = $1", [userId]);
    return result.rows;
}

async function createNewPostOfUser(postData){
    const {user_id, content, created_at} = postData;
    const result = await db.query("INSERT INTO Posts (user_id, content, created_at) VALUES ($1, $2, $3) RETURNING *", 
    [user_id, content, created_at]);
    return result.rows[0];
}

async function deleteMyPost(postId){
    const result = await db.query("DELETE FROM Posts WHERE id = $1 RETURNING *", [postId]);
    return result.rows[0];
}

module.exports = {
    getAllPosts
}