const jwt = require('jsonwebtoken');
const token = require('../config.js');
const jwtSecret = token.jwtSecret;

function verifyToken(req, res, next) {
    const accessToken = req.header('Authorization');
    if (!accessToken) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(accessToken, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Access token expired. Use refresh token to get a new access token.' });
        }
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;
