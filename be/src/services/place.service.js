const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { prisma } =  require("../../lib/prisma");

async function getAllPlaces() {
    const data = await prisma.place.findMany();
    return data;
}

async function getPlacesByDestination(slug) {
    const data = await prisma.place.findMany({
        where: {
            slug: slug
        }
    });
    return data;
}

async function getPlaceById(place_id) {
    try {
        const result = await prisma.place.findUnique({
            where: {
                place_id: place_id
            }
        });
        return result;
    } catch (error) {
        throw new Error("Place not found");
    }
}

async function getPlacesLimit(limit) {
    const result = await prisma.place.findMany({
        take: limit
    });
    return result;
}

async function createNewPlace({name, description, address, city, country, slug, image_url, average_rating}) {
    const result = await prisma.place.create({
        data: {
            name,
            description,
            address,
            city,
            country,
            slug,
            image_url,
            average_rating
        }
    });
    return result;
}

async function deletePlace(place_id) {
    try {
        const result = await prisma.place.delete({
            where: {
                place_id: place_id
            }
        });
        return result;
    } catch (error) {
        throw new Error("Place not found");
    }
}


async function updatePlace(place_id, {name, description, address, city, country, slug, image_url, average_rating}) {
    try {
        const result = await prisma.place.update({
            where: {
                place_id: place_id
            },
            data: {
                name,
                description,
                address,
                city,
                country,
                slug,
                image_url,
                average_rating
            }
        });
        return result;
    } catch (error) {
        throw new Error("Place not found");
    }
}


module.exports = {
    getAllPlaces, 
    getPlaceById,
    getPlacesLimit,
    createNewPlace,
    updatePlace,
    deletePlace,
    getPlacesByDestination
}