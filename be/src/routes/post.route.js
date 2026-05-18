const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.post('/', PostController.uploadPost);

router.delete('/:id', PostController.deletePost);

router.put('/:id', PostController.updatePost);

router.get('/place/:slug', PostController.getPostsByPlaceSlug);

router.get('/:id', PostController.getPostById);

router.get('/', PostController.getPosts);

module.exports = router;