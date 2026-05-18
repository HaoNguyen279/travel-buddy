const jwt = require('jsonwebtoken');
require('dotenv').config();


function getAccessTokenFromRequest(req) {
    if (req.cookies?.accessToken) {
        return req.cookies.accessToken;
    }

    const authHeader = req.headers?.authorization;
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7).trim();
    }

    return null;
}

function authenticateAccessToken(req, res, next) {
    const token = getAccessTokenFromRequest(req);

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

function authenticateAccessTokenOptional(req, res, next) {
    const token = getAccessTokenFromRequest(req);
    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (!err) {
            req.user = user;
        }
        return next();
    });
}

function refreshToken()
{



}

module.exports = { authenticateAccessToken, authenticateAccessTokenOptional }
