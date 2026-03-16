const { getAllComments, getCommentByPostId, createNewComment, updateComment, deleteComment} = require('../services/CommentService');


class CommentController{
    // [GET] /comment?post_id=number
    async getComments(req, res, next){
        try {
            const post_id = req.query.post_id;
            if(post_id) {
                const data = await getCommentByPostId(post_id);
                return res.status(200).json(data);
            }
            const data = await getAllComments();
            res.status(200).json(data);
        } catch (error) {            
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [GET] /comment/:id
    async getCommentByPostId(req, res, next){
        try {
            const commentId = req.params.id;
            if(!commentId) return res.status(400).json({message: "Comment ID is required"});
            const data = await getCommentByPostId(commentId);
            if(!data) return res.status(404).json({message: "Comment not found"});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [POST] /comment
    async createComment(req, res, next){
        try {
            const commentData = req.body;
            if(!commentData) return res.status(400).json({message: "Comment data is required"});
            const result = await createNewComment(commentData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [PUT] /comment/:id
    async updateComment(req, res, next){
        try {
            const commentId = req.params.id;
            const commentData = req.body;
            if(!(commentId && commentData)) return res.status(400).json({message: "Both comment ID and comment data are required"});
            const result = await updateComment(commentId, commentData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [DELETE] /comment/:id
    async deleteComment(req, res, next){
        try {
            const commentId = req.params.id;
            if(!commentId) return res.status(400).json({message: "Comment ID is required"});
            const result = await deleteComment(commentId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }

}

module.exports = new CommentController;