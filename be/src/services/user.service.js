const e = require('express');
const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { verify_password } = require('../auth/password');

async function getAllUsers() {
    // const pool = await poolPromise;
    // const result = await pool.request()
    //     .query('SELECT * FROM Users')
    // return result.recordset;
    const result = await db.query("SELECT * FROM Users");
    return result.rows;

}
async function getUserById(id) {
    // const pool = await poolPromise;
    // const result = await pool.request()
    //     .query("SELECT * FROM Users WHERE user_id = ?", [id])
    const result = await db.query("SELECT * FROM Users WHERE user_id = $1", [id]);
    return result.rows;
}

const createNewUser = async (username, email, hashed_password, full_name, avatar_url, bio) =>{
    const result = await db.query('INSERT INTO Users(username, email, password_hash, full_name, avatar_url, bio) VALUES ($1,$2,$3,$4,$5,$6)',[username, email,hashed_password, full_name ,avatar_url, bio]);
    if(result) return true;
    return false;
}

const verifyLoginUser = async (email, text_password) =>{
    const user_hashed_password = await db.query("SELECT password_hash from Users WHERE email = $1", [email]);
    const isCorrectPassword = await verify_password(text_password, user_hashed_password.rows[0].password_hash);
    if(isCorrectPassword) return (await db.query("SELECT * from Users WHERE email = $1", [email])).rows[0];
    return false;

}




module.exports = {
    getAllUsers, getUserById, createNewUser, verifyLoginUser
}