const TelegramApi = require('node-telegram-bot-api');
const config = require('./config.js');
if (!config.botToken) {
    throw new Error('Telegram Bot Token not provided!');
  }
  
const bot = new TelegramApi(config.botToken, { polling: true });
module.exports = bot;
