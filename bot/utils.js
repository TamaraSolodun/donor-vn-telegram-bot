const bot = require('./bot');



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
module.exports = { donorCommands };
