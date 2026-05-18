const {
	getAllPosts,
	getPostsByUserId,
	getPostById,
	createNewPostOfUser,
	deletePost,
	updatePost,
	getPostsLimit,
	getPostsByPlaceSlug
} = require('../services/post.service')


class PostController{
	// [GET]
    async getPosts(req, res, next){
        try {
			const limit = req.query.limit;
            const userId = req.query.user_id;
            if (userId) {
                const data = await getPostsByUserId(userId, limit);
                return res.status(200).json(data);
            }
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

	// [GET] /post/place/:slug
	async getPostsByPlaceSlug(req, res, next){
		try {
			const slug = req.params.slug;
			if(!slug) return res.status(400).json({message: "Place slug is required"});
			const limit = req.query.limit;
			const data = await getPostsByPlaceSlug(slug, limit);
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({message: "Internal server error:" + error});
		}
	}
 
}

module.exports = new PostController;