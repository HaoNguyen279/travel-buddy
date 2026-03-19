const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router.post('/', CommentController.createComment);

router.delete('/:id', CommentController.deleteComment);

router.put('/:id', CommentController.updateComment);

router.get('/:id', CommentController.getCommentByPostId);

router.get('/', CommentController.getComments);

module.exports = router;