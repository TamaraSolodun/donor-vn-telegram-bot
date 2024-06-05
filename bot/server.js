const express = require('express');
const cors = require('cors');

const { getDonors } = require('./api/getDonors.js');
const { updateDonor } = require('./api/updateDonor.js');

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

module.exports = server;
