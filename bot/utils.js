const bot = require('./bot');

const receiveTextFromBot = new Promise((resolve) => {
  bot.once('text', (text) => resolve(text));
});

const donorCommands = [
  { command: '/start', description: 'Початкове привітання' },
  { command: '/info', description: 'Інформація про Вінницький центр крові' },
  {
    command: '/contacts',
    description: 'Контакти і місцерозташування центру',
  },
  { command: '/registration', description: 'Зареєструватись' },
  { command: '/partners', description: 'Партнери та подарунки' },

];
module.exports = { donorCommands, receiveTextFromBot };
