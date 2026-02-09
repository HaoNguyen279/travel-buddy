const jwt = require('jsonwebtoken');
require('dotenv').config();


function authenticateAccessToken(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        console.log("Không tìm thấy access token trong cookies.");
        return res.status(401).json({ message: "Access token missing" });
    }

    console.log(" Token nhận được:", token);

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
            console.log("Token verify error:", err.message);
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        console.log("Token verified! User:", user);
        req.user = user;
        next();
    });
}

function refreshToken()
{



}

module.exports = { authenticateAccessToken }
