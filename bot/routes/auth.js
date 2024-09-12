const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const token = require('../config.js');
const refreshTokenSecret = token.jwtRefreshSecret;
const jwtSecret = token.jwtSecret;
const accessTokenExpiresIn = token.accessTokenExpiresIn;
const { loginUser } = require('../api/loginUser');

router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshTokenSecret);
        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: accessTokenExpiresIn });

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

router.post('/login', loginUser);

module.exports = router;
