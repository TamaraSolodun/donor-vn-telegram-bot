const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { registerUser } = require('../api/registerUser');
const { loginUser } = require('../api/loginUser');

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;