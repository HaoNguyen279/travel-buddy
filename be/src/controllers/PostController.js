const {getAllPosts , getAllPostsOfUser, createNewPostOfUser, deleteMyPost} = require('../services/post.service')
const {hash_password} = require('../auth/password');
const {generateAccesssToken, generateRefreshToken} = require('../middlewares/cookiesJwtAuth');
const { insertRefreshToken } = require('../services/token.service');
const jwt = require("jsonwebtoken");
const { json } = require('express');
class PostController{
	// [GET]
    async getAllPosts(req, res, next){
        const data = await getAllPosts();
        res.json(data);
    }
	// [GET]
    async getAllPostsOfUser(req, res, next){
        const id = req.params.id;
        const data = await getAllPostsOfUser(id);
        res.json(data);
    }
	// [POST]
	async postMyPost(){
		const postData = req.body; // get post data from body
        
        
	}
	// [DELETE]
	async removeMyPost(){
		const postId = req.query.id; // post id
		const result = await deleteMyPost(id);
		res.json({})
        
        
	}
 
}

module.exports = new PostController;