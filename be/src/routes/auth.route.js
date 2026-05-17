const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const  {authenticateAccessToken}  = require('../middlewares/authenticate');

router.post('/login', (req, res, next) => UserController.login(req, res, next));

router.post('/register', (req, res, next) => UserController.register(req, res, next));

router.post('/refresh', (req, res, next) => UserController.refresh(req, res, next));

router.post('/google-login', (req, res, next) => UserController.googleLogin(req, res, next));

router.get('/me', (req, res, next) => UserController.me(req, res, next));


module.exports =  router;