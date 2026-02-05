const { getAllPlaces } = require('../services/place.service')

class PlaceController {
    async getAllPlaces(req, res, next) {
        const data = await getAllPlaces();
        res.json(data);
    }
}

module.exports = new PlaceController;