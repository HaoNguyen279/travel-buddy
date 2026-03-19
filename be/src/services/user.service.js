const e = require('express');
const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { verify_password } = require('../auth/password');
const { prisma } =  require("../../lib/prisma");
async function getAllUsers() {
    // const pool = await poolPromise;
    // const result = await pool.request()
    //     .query('SELECT * FROM Users')
    // return result.recordset;
    // const result = await db.query("SELECT * FROM Users");
    // return result.rows;
    try {
        const result = await prisma.user.findMany();
        return result;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

async function getUserById(id) {
    // const pool = await poolPromise;
    // const result = await pool.request()
    //     .query("SELECT * FROM Users WHERE user_id = ?", [id])
    try {
        const result = await prisma.user.findUnique({
            where: {
                user_id: id
            }        
        });
        return result;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
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
    getAllUsers, getUserById, createNewUser, verifyLoginUser, deleteUserById, updateUser
}