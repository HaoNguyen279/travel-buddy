const express = require('express');
const router = express.Router();
const PlaceController = require('../controllers/PlaceController');

router.post('/', PlaceController.createPlace);

router.delete('/:id', PlaceController.deletePlace);

router.put('/:id', PlaceController.updatePlace);

router.get('/:id', PlaceController.getPlaceById);

router.get('/', PlaceController.getPlaces);

module.exports = router;