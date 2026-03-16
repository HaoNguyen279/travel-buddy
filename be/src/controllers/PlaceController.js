const { getAllPlaces, getPlaceById, getPlacesLimit, createNewPlace, updatePlace, deletePlace } = require('../services/place.service')

class PlaceController {
    // [GET] /place - /place?limit=number
    async getPlaces(req, res, next) {
        try {
            const limit = req.query.limit;
            if(limit) {
                const data = await getPlacesLimit(limit);
                return res.status(200).json(data);
            }
            const data = await getAllPlaces();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [GET] /place/:id
    async getPlaceById(req, res, next){
        try {
            const place_id = req.params.id;
            if(!place_id) res.status(400).json({message:  "PLace ID is required"});
            const data = await getPlaceById(place_id);
            if(!data) return res.status(404).json({message: "Place not found"});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [POST] /place
    async createPlace(req, res, next){
        try {
            const placeData = req.body;
            if(!placeData) return res.status(400).json({message: "Place data is required"});
            const result = await createNewPlace(placeData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error});
        }
    }
    // [PUT] /place/:id
    async updatePlace(req, res, next){
        try {
            const data = req.body;
            const place_id = req.params.id;
            if(!(data && place_id)) return res.status(400).json({message : "Both place data and place id are required"});
            
            const result = await updatePlace(place_id, data);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Internal server error: " + error});
        }
    }
    // [DELETE] /place/:id
    async deletePlace(req, res, next){
        try {
            const place_id = req.params.id;
            if(!place_id) return res.status(400).json({message: "Place ID is required"});
            const result = await deletePlace(place_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Internal server error: " + error});
        }
    }
}

module.exports = new PlaceController;