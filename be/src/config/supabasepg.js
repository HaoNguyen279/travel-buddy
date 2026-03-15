require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL (Supabase) connected successfully 🚀");
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Kết nối PostgreSQL thất bại:', error.message);
    return false;
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  testConnection
};
