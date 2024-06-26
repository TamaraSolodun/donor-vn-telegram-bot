const bot = require('./bot.js');
const {
  handleContactsCommand,
  handleInfoCommand,
  handleRegisterCommand,
  handleStartCommand,
  handleCallbackQuery,
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

const job = schedule.scheduleJob('0 0 * * *', async () => {
  console.log('Running scheduled task to update donor records...');

  try {
    const currentDate = new Date();

    const outdatedDonors = await Donor.find({ dateOfNextDonation: { $lt: currentDate } });

    if (outdatedDonors.length > 0) {
      console.log(`Found ${outdatedDonors.length} outdated donor records.`);

      for (const donor of outdatedDonors) {
        donor.set({
          dateOfLastDonation: donor.dateOfNextDonation,
          dateOfNextDonation: null,
          willDonate: '',
        });

        await donor.save({ validateBeforeSave: false });

        console.log(`Updated donor record for user ${donor.userId}.`);
      }
    } else {
      console.log('No outdated donor records found.');
    }

    console.log('Scheduled task completed successfully.');
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
});

job.on('error', (error) => {
  console.error('Scheduled job error:', error);
});

job.on('run', () => {
  console.log('Scheduled job is running.');
});

start();

