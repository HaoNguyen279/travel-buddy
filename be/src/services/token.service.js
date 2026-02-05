const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre')
const crypto = require("crypto");

async function getAllPosts(){
    // const pool = await poolPromise;
    // const result = await pool.request()
    //     .query("SELECT * FROM Posts");
    // return result.recordset;
    const result = await db.query("SELECT * FROM Posts");
    return result.rows;
}


// refreshToken: token thô (random string / jwt refresh)
// userId: UUID của users.user_id
// userAgent: req.headers["user-agent"]
// ip: req.ip (hoặc lấy từ headers proxy)

async function insertRefreshToken({userId, refreshToken, userAgent, ip, expiresInDays = 30 }) {
    // default expires in 30 days ko truyền nếu truyền thì nó override
  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const sql = `
    INSERT INTO refreshtokens (user_id, token_hash, user_agent, ip, expires_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING token_id, user_id, session_id, created_at, expires_at, revoked_at
  `;

  const params = [userId, tokenHash, userAgent ?? null, ip ?? null, expiresAt];

  const result = await db.query(sql, params);
  return result.rows[0];
}


module.exports = {
    getAllPosts, insertRefreshToken
}