const Donor = require('./Models/Donor');
const LogMessage = require('./Models/LogMessage');
const { scheduleFollowUpJob } = require('./api/scheduleFollowUpJob');
const bot = require('./bot');
const twilio = require('twilio');
const token = require('./config.js');

const { receiveTextFromBot } = require('./utils');

const accountSid = token.accountSidTwilio;
const authToken = token.authTokenTwilio;
const twilioClient = new twilio(accountSid, authToken);

const handleInviteDonor = async (phoneNumber, message = "Реєструйтесь у телеграм боті 'Вінницького центру служби крові' для швидшого отримання повідомлень про потребу донорів! Посилання: https://t.me/vn_donor_bot") => {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: '+19787234018',
      to: phoneNumber
    });
    console.log(`Invite sent with SID: ${result.sid}`);
    await LogMessage.create({
      userId: 'unknown',
      firstName: 'unknown',
      surname: 'unknown',
      success: true,
      message: message,
      messageType: 'inviteDonor',
      messageProps: {
        phoneNumber: phoneNumber
      },
    });
    return result.sid;
  } catch (error) {
    console.error('Error sending invite:', error);
    await LogMessage.create({
      userId: 'unknown',
      firstName: 'unknown',
      surname: 'unknown',
      success: false,
      message: message,
      messageType: 'inviteDonor',
      messageProps: {
        phoneNumber: phoneNumber
      },
    });
    throw error;
  }
};

const handleStartCommand = (chatId) => {
  bot.sendMessage(
    chatId,
    'Вітаю. Це телеграм бот Вінницького центру служби крові. Тут ви можете дізнатись всю необхідну інформацію про донорство. А також будете отримувати інформацію про необхідну кров.',
  );
};

const handleInfoCommand = (chatId) => {
  bot.sendMessage(
    chatId,
    "Комунальне некомерційне підприємство 'Вінницький обласний центр служби крові' Вінницької обласної Ради заготовляє цільну кров і тромбоцитну масу. Плазму крові центр тимчасово не заготовляє, адже в умовах воєнного стану в пріоритеті цільна кров для забезпечення потреб військових та цивільного населення. У центрі крові приймають донорів будь-яким з місцем реєстрації. Для кроводачі донорам потрібно мати з собою паспорт та ідентифікаційний код (якщо це ID-картка - то довідку про місце реєстрації). Також підходить застосунок ДІЯ. У центрі крові приймають тромбоцитну масу у жінок у середині менструального циклу.",
  );
};

const handleContactsCommand = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Сторінки в соцмережах : \nhttps://www.facebook.com/donorvn/ \nhttps://www.instagram.com/vinnytsia_bloodservice/ \n\nГрафік роботи: \n🔹Понеділок - п'ятниця з 8:00 до 15:00 \n🔹Субота з з 8:00 до 14:00 \n🔹Неділя - вихідний \n\n☎️ Контакти: +380432551575, +380674920034\n\n📍 Адреса: вул. Пирогова 48, м.Вінниця, 21018",
  );
  await bot.sendLocation(chatId, 49.228_778_751_590_59, 28.450_781_729_447_773);
};

const handlePartnersCommand = async (chatId) => {
  const imagePath = 'images/1.PNG';

  bot.sendPhoto(chatId, imagePath, { caption: 'Партнери та подаруночки донорам' })
    .then(() => {
      console.log('Image sent successfully');
    })
    .catch(err => {
      console.error('Error sending image:', err);
    });
};

const handleSendMessage = async (selectedUserIds, bloodGroup, dateOfNextDonation, notes) => {
  try {
    console.log('Selected User IDs:', selectedUserIds);

    const message =
      "'Вінницький обласний центр служби крові' потребує донора крові: " +
      bloodGroup +
      '.\nОчікувати Вас: ' +
      dateOfNextDonation +
      '?' +
      '\nПримітка: ' + notes;

    const users = await Donor.find({ userId: { $in: selectedUserIds } });

    console.log('Users retrieved:', users);

    const notFoundUsers = selectedUserIds.filter(id => !users.some(user => user.userId === id));
    const failedSends = [];
    const successfulSends = [];

    for (const user of users) {
      const { userId, firstName, surname } = user;
      try {
        console.log('Sending message to:', userId);
        await bot.sendMessage(userId, message, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Так', callback_data: `yes:${dateOfNextDonation}` },
                { text: 'Ні', callback_data: 'no' },
              ],
            ],
          },
        });
        console.log('Message sent to:', userId);
        successfulSends.push(userId);

        await LogMessage.create({
          userId: userId,
          firstName: firstName,
          surname: surname,
          success: true,
          message: message,
          messageType: 'willDonate',
          messageProps: {
            bloodGroup,
            dateOfNextDonation,
            notes
          },
        });

      } catch (sendError) {
        console.error('Error sending message to:', userId, sendError);
        failedSends.push(userId);
        await LogMessage.create({
          userId: userId,
          success: false,
          message: message,
          messageType: 'willDonate',
          messageProps: {
            bloodGroup,
            dateOfNextDonation,
            notes
          },
        });
      }
    }

    console.log('Messages sent successfully to:', successfulSends);
    if (failedSends.length > 0) {
      console.error('Failed to send messages to:', failedSends);
    }
    if (notFoundUsers.length > 0) {
      console.error('Users not found:', notFoundUsers);
    }

  } catch (error) {
    console.error('Error handling send messages:', error);
    throw error;
  }
};


const handleConfirmDonation = async (userId, dateOfNextDonation) => {
  const donor = await Donor.findOne({ userId: userId });
    try {
      console.log(`Executing follow-up job for user ${userId}`);
      
      if (donor) {
        const message = `Добрий день! Чи відвідали Ви центр служби крові ${dateOfNextDonation}?`;

        await bot.sendMessage(donor.userId, message, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Так', callback_data: `confirm:${dateOfNextDonation}` },
                { text: 'Ні', callback_data: 'not_confirm' },
              ],
            ],
          },
        });

        console.log(`Sent follow-up message to user ${donor.userId}.`);
        await LogMessage.create({
          userId: userId,
          firstName: donor.firstName,
          surname: donor.surname,
          success: true,
          message: message,
          messageType: 'confirmDonate',
          messageProps: {
            dateOfNextDonation,
          },
        });
      } else {
        console.error(`Donor with userId ${userId} not found.`);
        await LogMessage.create({
          userId: userId,
          firstName: donor.firstName,
          surname: donor.surname,
          success: false,
          message: message,
          messageType: 'confirmDonate',
          messageProps: {
            dateOfNextDonation,
          },
        });
      }
    } catch (error) {
      console.error('Error sending follow-up message:', error);
      await LogMessage.create({
        userId: userId,
        firstName: donor.firstName,
        surname: donor.surname,
        success: false,
        message: message,
        messageType: 'confirmDonate',
        messageProps: {
          dateOfNextDonation,
        },
      });
    }
  }

const handleRegisterCommand = async (message, chatId) => {
  const existingDonor = await Donor.findOne({ userId: chatId });
  if (existingDonor) {
    console.log(existingDonor);
    await bot.sendMessage(chatId, 'Ваc уже зареєстровано!');
    return;
  }

  await bot.sendMessage(chatId, 'Вкажіть Ваш номер телефону:');
  const phoneNumberResponse = await receiveTextFromBot();
  const phoneNumber = phoneNumberResponse.text;

  await bot.sendMessage(chatId, "Вкажіть Ваше ім'я:");
  const firstNameResponse = await receiveTextFromBot();
  const firstName = firstNameResponse.text;

  await bot.sendMessage(chatId, 'Вкажіть Ваше прізвище:');
  const surnameResponse = await receiveTextFromBot();
  //mock for bot
  const surname = surnameResponse.text;
  console.log(message.from);

  const donor = {
    userId: chatId,
    username: message.from.username || firstName,
    phoneNumber,
    firstName,
    surname,
  };

  await Donor.create(donor);

  await bot.sendMessage(chatId, 'Вас успішно зареєстровано!');
};

const handleCallbackQuery = async (callbackQuery) => {
  const { data, message } = callbackQuery;
  const chatId = message.chat.id;
  const messageId = message.message_id;

  try {
    if (data.startsWith('yes:') || data.startsWith('no')) {
      const [response, dateOfNextDonation] = data.split(':');
      const update = { willDonate: response };

      if (response === 'yes' && dateOfNextDonation) {
        update.dateOfNextDonation = dateOfNextDonation;
        scheduleFollowUpJob(chatId, dateOfNextDonation);
      } else {
        update.dateOfNextDonation = null;
      }
      await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
      await Donor.updateOne({ userId: chatId }, { $set: update });
      await bot.sendMessage(chatId, `Дякуємо за відповідь! \n Очікуємо Вас ${dateOfNextDonation}.`);

    } else if (data.startsWith('confirm:') || data === 'not_confirm') {
      if (data.startsWith('confirm:')) {
        const donationDate = new Date(data.split(':')[1]);
        const formattedDate = `${donationDate.getFullYear()}-${(donationDate.getMonth() + 1).toString().padStart(2, '0')}-${donationDate.getDate().toString().padStart(2, '0')}`;
        await Donor.findOneAndUpdate(
          { userId: chatId },
          {
            dateOfLastDonation: formattedDate,
            dateOfNextDonation: null,
            willDonate: null,
          }
        );
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await bot.sendMessage(chatId, 'Дякуємо за підтвердження!');
        await handlePartnersCommand(userId);

      } else if (data === 'not_confirm') {
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await bot.sendMessage(chatId, 'Дякуємо за відповідь.');
      }
    }
  } catch (error) {
    console.error('Error processing callback query:', error);
    await bot.sendMessage(chatId, 'Error processing your response. Please try again later.');
  }
};


module.exports = {
  handleContactsCommand,
  handleInfoCommand,
  handleRegisterCommand,
  handleStartCommand,
  handleSendMessage,
  handleCallbackQuery,
  handleInviteDonor,
  handlePartnersCommand,
  handleConfirmDonation
};
