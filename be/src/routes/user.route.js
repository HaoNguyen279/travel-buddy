const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateAccessToken, authenticateAccessTokenOptional } = require('../middlewares/authenticate');

router.put('/:id', (req, res, next) => UserController.updateUser(req, res, next));

router.delete('/:id', (req, res, next) => UserController.deleteUserById(req, res, next));

router.get('/me/profile', authenticateAccessToken, UserController.getMyProfile);

router.put('/me/profile', authenticateAccessToken, UserController.updateMyProfile);

router.get('/me', authenticateAccessToken, UserController.getMe);

router.get('/:id/profile', authenticateAccessTokenOptional, UserController.getUserProfile);

router.post('/:id/follow', authenticateAccessToken, UserController.followUser);

router.delete('/:id/follow', authenticateAccessToken, UserController.unfollowUser);

router.get('/:id/followers', UserController.getFollowers);

router.get('/:id/following', UserController.getFollowing);

router.get('/:id', (req, res, next) => UserController.getUserById(req, res, next));

router.get('/', (req, res, next) => UserController.getAllUsers(req, res, next));

module.exports = router;