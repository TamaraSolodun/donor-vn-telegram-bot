const express = require('express');
const cors = require('cors');

const { getDonors } = require('./api/getDonors.js');
const { updateDonor } = require('./api/updateDonor.js');
const { registerUser } = require('./api/registerUser.js');

const { sendMessages } = require('./api/sendMessages.js');
const token = require('./config.js');
const mongoose = require('mongoose');
const { getDonorById } = require('./api/getDonorById.js');
mongoose.connect(token.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = express();

server.use(cors());
server.use(express.json());

server.get('/api/donors', getDonors);
server.get('/api/donors/:userId', getDonorById);
server.post('/api/sendMessages', sendMessages);
server.put('/api/donors/:id', updateDonor);


server.post('/api/register', registerUser);


module.exports = server;

//https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49
//https://github.com/nodkz/mongodb-memory-server