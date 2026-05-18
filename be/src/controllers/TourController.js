const {
    getAllTours,
    getToursLimit,
    getToursByPlace,
    getToursByPlaceSlug,
    getToursByCategory,
    getTourById,
    createNewTour,
    updateTour,
    deleteTour,
    createOrUpdateTourRating,
    getTourFormData
} = require('../services/tour.service');

class TourController {
    // [GET] /tour - Query params: ?limit=10 | ?slug=xxx | ?place_id=xxx | ?category_id=xxx
    async getTours(req, res, next) {
        try {
            const limit = parseInt(req.query.limit);
            if (limit) {
                const data = await getToursLimit(limit);
                return res.status(200).json(data);
            }

            const { place_id, slug, category_id } = req.query;

            if (slug) {
                const data = await getToursByPlaceSlug(slug);
                return res.status(200).json(data);
            }

            if (place_id) {
                const data = await getToursByPlace(place_id);
                return res.status(200).json(data);
            }

            if (category_id) {
                const data = await getToursByCategory(category_id);
                return res.status(200).json(data);
            }

            const data = await getAllTours();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal server error: " + error });
        }
    }

    // [GET] /tour/:id
    async getTourById(req, res, next) {
        try {
            const tour_id = req.params.id;
            if (!tour_id) return res.status(400).json({ message: "Tour ID is required" });
            const data = await getTourById(tour_id);
            if (!data) return res.status(404).json({ message: "Tour not found" });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal server error:" + error });
        }
    }

    // [POST] /tour
    async createTour(req, res, next) {
        try {
            const tourData = req.body;
            if (!tourData) return res.status(400).json({ message: "Tour data is required" });
            const result = await createNewTour(tourData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Internal server error:" + error });
        }
    }

    // [PUT] /tour/:id
    async updateTour(req, res, next) {
        try {
            const data = req.body;
            const tour_id = req.params.id;
            if (!(data && tour_id)) return res.status(400).json({ message: "Both tour data and tour id are required" });

            const result = await updateTour(tour_id, data);
            res.status(200).json(result);
        } catch (error) {
            const message = String(error?.message || error);
            if (message.toLowerCase().includes("not found")) {
                return res.status(404).json({ message: "Tour not found" });
            }
            res.status(500).json({ message: "Internal server error: " + error });
        }
    }

    // [DELETE] /tour/:id
    async deleteTour(req, res, next) {
        try {
            const tour_id = req.params.id;
            if (!tour_id) return res.status(400).json({ message: "Tour ID is required" });
            const result = await deleteTour(tour_id);
            res.status(200).json(result);
        } catch (error) {
            const message = String(error?.message || error);
            if (message.toLowerCase().includes("not found")) {
                return res.status(404).json({ message: "Tour not found" });
            }
            res.status(500).json({ message: "Internal server error: " + error });
        }
    }

    // [POST] /tour/:id/rating
    async createOrUpdateRating(req, res, next) {
        try {
            const tour_id = req.params.id;
            const user_id = req.user?.id;
            const score = Number(req.body?.score);
            const review = req.body?.review ?? "";

            if (!tour_id) return res.status(400).json({ message: "Tour ID is required" });
            if (!user_id) return res.status(401).json({ message: "User not authenticated" });
            if (!Number.isInteger(score) || score < 1 || score > 5) {
                return res.status(400).json({ message: "Score must be an integer between 1 and 5" });
            }

            const result = await createOrUpdateTourRating({
                tour_id,
                user_id,
                score,
                review
            });

            return res.status(200).json(result);
        } catch (error) {
            const message = String(error?.message || error);
            if (message.toLowerCase().includes("tour not found")) {
                return res.status(404).json({ message: "Tour not found" });
            }
            if (message.toLowerCase().includes("score must")) {
                return res.status(400).json({ message });
            }
            return res.status(500).json({ message: "Internal server error: " + error });
        }
    }

    // [GET] /tour/form-data
    async getTourFormData(req, res, next) {
        try {
            const data = await getTourFormData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal server error: " + error });
        }
    }

    // [GET] /tour/destination/:slug
    async getToursByPlaceSlug(req, res, next) {
        try {
            const slug = req.params.slug;
            if (!slug) return res.status(400).json({ message: "Slug is required" });
            const data = await getToursByPlaceSlug(slug);
            if (!data) return res.status(404).json({ message: "Tours not found" });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Internal server error: " + error });
        }
    }
}

module.exports = new TourController();