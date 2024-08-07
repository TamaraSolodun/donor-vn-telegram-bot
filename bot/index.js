const bot = require('./bot.js');
const {
  handleContactsCommand,
  handleInfoCommand,
  handleRegisterCommand,
  handleStartCommand,
  handleCallbackQuery,
  handlePartnersCommand,
} = require('./handleFunctions.js');

const { donorCommands } = require('./utils.js');
const server = require('./server.js');
const schedule = require('node-schedule');
const Donor = require('./Models/Donor');
const start = async () => {
  server.listen(8000, () => console.log(`Server running on port 8000`));

  bot.setMyCommands(donorCommands);
  bot.on('message', async (message) => {
    const text = message.text;
    const chatId = message.chat.id;

    try {
      switch (text) {
        case '/start': {
          handleStartCommand(chatId);

          break;
        }
        case '/info': {
          handleInfoCommand(chatId);

          break;
        }
        case '/contacts': {
          await handleContactsCommand(chatId);

          break;
        }
        case '/partners': {
          await handlePartnersCommand(chatId);
          
          break;
        }
        default: {
          handleInfoCommand(chatId);
        }
      }
      //add object key : command
      //not expected text
      if (text === '/registration') {
        await handleRegisterCommand(message, chatId);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return bot.sendMessage(chatId, 'Щось пішло не так!)');
    }
  });
  bot.on('callback_query', handleCallbackQuery);

};


start();

