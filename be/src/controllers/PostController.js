const {getAllPosts , getPostById, createNewPostOfUser, deletePost, updatePost, getPostsLimit} = require('../services/post.service')


class PostController{
	// [GET]
    async getPosts(req, res, next){
        try {
			const limit = req.query.limit;
			if(limit) {
				const data = await getPostsLimit(limit);
				return res.status(200).json(data);
			}
			const data = await getAllPosts();
        	res.status(200).json(data);
		} catch (error) {
			res.status(500).json({message: "Internal server error:" + error});
		}
    }

	// [GET]
    async getPostById(req, res, next){
        try {
			const id = req.params.id;
			if(!id) return res.status(400).json({message: "Post ID is required"});
			const data = await getPostById(id);
			if(!data) return res.status(404).json({message: "Post not found"});
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({message: "Internal server error:" + error});
		}
    }


	// [POST]
	async uploadPost(req, res, next){
		try {
			const postData = req.body; // get post data from body
			if(!postData) return res.status(400).json({message: "Post data is required"});
			const data = await createNewPostOfUser(postData);
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({message: "Internal server error:" + error});
		}
	}
	// [DELETE]
	async deletePost(req, res, next){
		try {
			const postId = req.params.id; // post id
			if(!postId) return res.status(400).json({message: "Post ID is required"});
			const result = await deletePost(postId);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({message: "Internal server error:" + error});
		}
	}
	//[PUT] update post
	async updatePost(req, res, next){
		try {
			const postId = req.params.id;
			if(!postId) return res.status(400).json({message: "Post ID is required"});
			const postData = req.body;
			const data = await updatePost(postId, postData);
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({message: "Internal server error:" + error});
		}
	}
 
}

module.exports = new PostController;