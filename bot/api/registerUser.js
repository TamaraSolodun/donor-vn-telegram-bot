const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const registerUser = async (request, response) => {
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
        const token = jwt.sign({ userId: user._id }, 'donor-vn-sk', { // min 32 symbols generate & move to .env
            expiresIn: '1h',
        });
        response.status(200).json({ token });
    } catch (error) {
        response.status(500).json({ error: 'Login failed' });
    }
  }

module.exports = { registerUser };
