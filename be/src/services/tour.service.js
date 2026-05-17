const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { prisma } =  require("../../lib/prisma");


async function getAllTours() {
    const data = await prisma.tour.findMany({
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursLimit(limit) {
    const data = await prisma.tour.findMany({
        take: limit,
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursByPlace(place_id) {
    const data = await prisma.tour.findMany({
        where: {
            place_id: place_id
        },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursByPlaceSlug(slug) {
    // Tìm place theo slug, rồi lấy toàn bộ tours của place đó
    const place = await prisma.place.findFirst({
        where: {
            slug: slug
        }
    });

    if (!place) return [];

    const data = await prisma.tour.findMany({
        where: {
            place_id: place.place_id
        },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursByCategory(category_id) {
    const data = await prisma.tour.findMany({
        where: {
            category_id: category_id
        },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getTourById(tour_id) {
    const data = await prisma.tour.findUnique({
        where: {
            tour_id: tour_id
        },
        include: {
            place: true,
            category: true,
            ratings: true
        }
    });
    return data;
}

async function createNewTour({place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url}) {
    const data = await prisma.tour.create({
        data: {
            place_id,
            category_id,
            name,
            description,
            base_price,
            days,
            nights,
            max_guests,
            min_guests,
            image_url
        }
    });
    return data;
}

async function updateTour(tour_id, {place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url}) {
    const data = await prisma.tour.update({
        where: {
            tour_id: tour_id
        },
        data: {
            place_id,
            category_id,
            name,
            description,
            base_price,
            days,
            nights,
            max_guests,
            min_guests,
            image_url
        }
    });
    return data;
}

async function deleteTour(tour_id) {
    const data = await prisma.tour.delete({
        where: {
            tour_id: tour_id
        }
    });
    return data;
}

module.exports = {
    getAllTours,
    getToursLimit,
    getToursByPlace,
    getToursByPlaceSlug,
    getToursByCategory,
    getTourById,
    createNewTour,
    updateTour,
    deleteTour
}