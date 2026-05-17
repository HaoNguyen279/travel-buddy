const express = require('express');
const router = express.Router();
const TourController = require('../controllers/TourController');

router.post('/', TourController.createTour);

router.delete('/:id', TourController.deleteTour);

router.put('/:id', TourController.updateTour);

router.get('/:id', TourController.getTourById);

router.get('/', TourController.getTours);

module.exports = router;