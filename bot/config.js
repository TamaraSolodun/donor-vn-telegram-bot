require('dotenv').config({ path: '../.env' });

module.exports = {
  botToken: process.env.TOKEN,
  mongoURI: process.env.MONGO_URI,
  authTokenTwilio: process.env.TWILIO_AUTH_TOKEN,
  accountSidTwilio: process.env.TWILIO_ACCOUNT_SID,
};
