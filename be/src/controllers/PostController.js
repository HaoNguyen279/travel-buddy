const {getAllPosts , getPostById, createNewPostOfUser, deletePost, updatePost} = require('../services/post.service')


class PostController{
	// [GET]
    async getAllPosts(req, res, next){
        const data = await getAllPosts();
        res.json(data);
    }

	// [GET]
    async getPostById(req, res, next){
        const id = req.params.id;
        const data = await getPostById(id);
        res.json(data);
    }


	// [POST]
	async postMyPost(req, res, next){
		const postData = req.body; // get post data from body
        const data = await createNewPostOfUser(postData);
		res.json(data);
        
	}
	// [DELETE]
	async deletePost(req, res, next){
		const postId = req.params.id; // post id
		const result = await deletePost(postId);
		res.json(result);
	}
	//[PUT] update post
	async updatePost(req, res, next){
		const postId = req.params.id;
		const postData = req.body;
		const data = await updatePost(postId, postData);
		res.json(data);
	}
 
}

module.exports = new PostController;