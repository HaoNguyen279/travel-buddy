const express = require('express');

const router = express.Router();
const PlaceController = require('../controllers/PlaceController');
const { authenticateAccessToken } = require('../middlewares/authenticate');

router.get('/getAllPlaces', PlaceController.getAllPlaces);


module.exports = router;