const bot = require("./bot");
const {
  handleContactsCommand,
  handleInfoCommand,
  handleRegisterCommand,
  handleStartCommand,
} = require("./handleFunctions.js");

const { commands } = require("./utils/consts.js");
const server = require("./server.js")

const start = async () => {
  server.listen(5000, () => console.log(`Server running on port 5000`));

  bot.setMyCommands(commands);
  bot.on("message", async (msg) => {

    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        handleStartCommand(chatId);
      } else if (text === "/info") {
        handleInfoCommand(chatId);
      } else if (text === "/contacts") {
        await handleContactsCommand(chatId);
      }
      if (text === "/registration") {
        await handleRegisterCommand(msg, chatId);
      }
    } catch (e) {
      console.error("Error during registration:", e);
      return bot.sendMessage(chatId, "Щось пішло не так!)");
    }
  });
};

start();
