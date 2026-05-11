const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { prisma } =  require("../../lib/prisma");


async function getAllTours() {
    const data = await prisma.tour.findMany();
    return data;
}
async function getToursByPlace(place_id) {
    const data = await prisma.tour.findMany({
        where:{
            place_id: place_id
        }
    });
    return data;
}
async function getToursByCategory(category_id) {
    try {
        const data = await prisma.tour.findMany({
            where:{
                category_id: category_id
            }
        });
    } catch (error) {
        console.error("Error fetching tours by category:", error);
        throw error;
    }
    return data;
}

async function getTourById(tour_id){
    try {
        const data = await prisma.tour.findUnique({
            where:{
                tour_id: tour_id
            }
        })
    } catch (error) {
        console.error("Error fetching tour by ID:", error);
        throw error;
    }
    return data;
}
async function createNewTour({place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url}){
    try {
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
    } catch (error) {
        console.error("Error creating new tour:", error);
        throw error;
    }
}

async function updateTour(tour_id, {place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url}){
    try {
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
    } catch (error) {
        console.error("Error updating tour:", error);
        throw error;
    }
}
async function deleteTour(tour_id){
    try {
        const data = await prisma.tour.delete({
            where: {
                tour_id: tour_id
            }
        });
        return data;
    } catch (error) {
        console.error("Error deleting tour:", error);
        throw error;
    }
}
module.exports = {
    getAllTours,
    getToursByPlace,
    getToursByCategory,
    getTourById,
    createNewTour,
    updateTour,
    deleteTour
}