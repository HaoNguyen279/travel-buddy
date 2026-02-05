// require('dotenv').config();
// const sql = require('mssql');

// const config = {
//     user: process.env.DB_USER,       // bỏ nếu dùng Windows Auth
//     password: process.env.DB_PASS,
//     server: process.env.DB_HOST || 'localhost',
//     database: process.env.DB_NAME,
//     options: {
//         encrypt: false,              // local = false
//         trustServerCertificate: true
//     },
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     }
// }


// const poolPromise = new sql.ConnectionPool(config)
//     .connect()
//     .then(pool => {
//         console.log('MSSQL connected')
//         return pool
//     })
//     .catch(err => {
//         console.error('MSSQL connection failed:', err)
//         process.exit(1)
//     })

// module.exports = {
//     sql,
//     poolPromise
// }
