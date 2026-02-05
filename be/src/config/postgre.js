require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TravellerPostgre',
    password: process.env.DB_POSTGRE_PASS,
    port: 5432
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL connected successfully ! 💀💀💀");
        client.release();
        return true;
    } catch (error) {
        console.error('❌ Kết nối PostgreSQL thất bại:', err.message);
        return false;
    }
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    testConnection
};
