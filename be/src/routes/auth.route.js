const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const  {authenticateAccessToken}  = require('../middlewares/authenticate');

router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/refresh', UserController.refresh);

router.get('/me',  UserController.me);


module.exports =  router;