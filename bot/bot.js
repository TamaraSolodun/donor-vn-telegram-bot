const TelegramApi = require("node-telegram-bot-api");
const config = require("./utils/config");

const bot = new TelegramApi(config.token, { polling: true });

module.exports = bot;
