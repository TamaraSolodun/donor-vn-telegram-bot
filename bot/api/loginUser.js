const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const token = require('../config.js');
const accessTokenExpiresIn = token.accessTokenExpiresIn;
const refreshTokenExpiresIn = token.refreshTokenExpiresIn; 
const jwtSecret = token.jwtSecret;
const refreshTokenSecret = token.jwtRefreshSecret;

const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(401).json({ error: 'Authentication failed' });
        }

        const accessToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: accessTokenExpiresIn });
        const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });

        user.refreshToken = refreshToken;
        await user.save();

        response.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        response.status(500).json({ error: 'Login failed' });
    }
}

module.exports = { loginUser };
