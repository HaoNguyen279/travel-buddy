const express = require('express');
const router = express.Router();
const TourController = require('../controllers/TourController');
const { authenticateAccessToken } = require('../middlewares/authenticate');

router.post('/', TourController.createTour);

router.delete('/:id', TourController.deleteTour);

router.put('/:id', TourController.updateTour);

router.get('/form-data', TourController.getTourFormData);

router.get('/destination/:slug', TourController.getToursByPlaceSlug);

router.get('/:id', TourController.getTourById);

router.post('/:id/rating', authenticateAccessToken, TourController.createOrUpdateRating);

router.get('/', TourController.getTours);

module.exports = router;