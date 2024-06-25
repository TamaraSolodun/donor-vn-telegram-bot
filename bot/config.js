require('dotenv').config({ path: '../.env' });

module.exports = {
  botToken: process.env.TOKEN,
  mongoURI: process.env.MONGO_URI,
};
