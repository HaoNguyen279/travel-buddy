const jwt = require('jsonwebtoken');
require('dotenv').config();



function generateAccesssToken(user) {
    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
    return token;
}
function generateRefreshToken(user) {
    const refreshToken = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return refreshToken;
}


module.exports = {
    generateAccesssToken,
    generateRefreshToken
 };
