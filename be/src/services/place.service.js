const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');

// async function getAllPlaces(){ // MSSQL
//     const pool = await poolPromise;
//     const result = await pool.request()
//         .query("SELECT * FROM Places");
//     return result.recordset;
// }

async function getAllPlaces() { // postgre SQL
    const data = await db.query("SELECT * FROM Places");
    console.log(data.rows);
    return data.rows;
}

module.exports = {
    getAllPlaces
}