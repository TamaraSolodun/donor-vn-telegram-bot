const bot = require("../bot");

const receiveTextFromBot = new Promise((resolve) => {
  bot.once("text", (text) => resolve(text));
});

module.exports = {receiveTextFromBot}