const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.get('/getAllPosts', PostController.getAllPosts);

router.get('/getAllPostsOfUser/:id', PostController.getAllPostsOfUser);

router.post('/postMyPost', PostController.postMyPost);

router.delete('/deleteMyPost', PostController.removeMyPost);


module.exports = router;