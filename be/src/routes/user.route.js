const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateAccessToken } = require('../middlewares/authenticate');

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUserById);

router.get('/me/profile', authenticateAccessToken, UserController.getMyProfile);

router.get('/me', authenticateAccessToken, UserController.getMe);

router.get('/:id/profile', UserController.getUserProfile);

router.post('/:id/follow', authenticateAccessToken, UserController.followUser);

router.delete('/:id/follow', authenticateAccessToken, UserController.unfollowUser);

router.get('/:id/followers', UserController.getFollowers);

router.get('/:id/following', UserController.getFollowing);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getAllUsers);

module.exports = router;