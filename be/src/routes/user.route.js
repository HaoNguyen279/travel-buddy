const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.put('/:id', (req, res, next) => UserController.updateUser(req, res, next));

router.delete('/:id', (req, res, next) => UserController.deleteUserById(req, res, next));

router.get('/me', (req, res, next) => UserController.getMe(req, res, next));

router.get('/:id', (req, res, next) => UserController.getUserById(req, res, next));

router.get('/', (req, res, next) => UserController.getAllUsers(req, res, next));

module.exports = router;