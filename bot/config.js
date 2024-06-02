require('dotenv').config({ path: '../.env' });

module.exports = {
  token: process.env.TOKEN,
  mongoURI: process.env.MONGO_URI,
};
