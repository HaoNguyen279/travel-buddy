const express = require('express');

const router = express.Router();
const PlaceController = require('../controllers/PlaceController');
const GemmaController = require('../controllers/GemmaController');
const { authenticateAccessToken } = require('../middlewares/authenticate');

router.get('/getAllPlaces', PlaceController.getAllPlaces);

router.get('/getTop10Places', GemmaController.getResult);

module.exports = router;