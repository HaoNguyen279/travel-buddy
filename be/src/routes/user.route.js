const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/getAllUsers', UserController.getAllUsers);

router.get('/getUserById', UserController.getUserById);


module.exports = router;