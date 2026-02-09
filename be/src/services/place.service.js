const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');

// async function getAllPlaces(){ // MSSQL
//     const pool = await poolPromise;
//     const result = await pool.request()
//         .query("SELECT * FROM Places");
//     return result.recordset;
// } MSSQL

async function getAllPlaces() {
    const data = await db.query("SELECT * FROM Places");
    console.log(data.rows);     
    return data.rows;
}

async function getPlaceById(place_id){
    const result = await db.query("SELECT * FROM Places WHERE place_id = $1", [place_id]);
    return result.rows[0];
}

async function getPlacesLimit(limit) {
    const result = await db.query("SELECT * FROM Places LIMIT $1", [limit]);
    return result.rows;
}

async function createNewPlace({name, description, address, city, country, category, image_url, average_rating}){
    const result = await db.query("INSERT INTO Places(name, description, address, city, country, category, image_url, average_rating) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
        [name, description, address, city, country, category, image_url, average_rating]
    );
}

async function deletePlace(place_id) {
    const result = await db.query('DELETE FROM Places WHERE place_id = $1', [place_id]);
    return result.rows;
}

async function updatePlace(place_id, {name, description, address, city, country, category, image_url, average_rating}) {
    const result = await db.query("UPDATE Places SET name = $1" +
        ", description = $2" + 
        ", address = $3" + 
        ", city = $4" + 
        ", country = $5" + 
        ", category = $6" + 
        ", image_url = $7" + 
        ", average_rating = $8" + 
        " WHERE place_id = $9",
        [name, description, address, city, country, category, image_url, average_rating, place_id]
    )
    return result.rows;
}

module.exports = {
    getAllPlaces, 
    getPlaceById,
    getPlacesLimit,
    createNewPlace,
    updatePlace,
    deletePlace
}