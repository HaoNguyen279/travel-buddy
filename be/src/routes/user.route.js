const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUserById);

router.get('/me', UserController.getMe);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getAllUsers);

module.exports = router;