const Donor = require("./Models/Donor");
const bot = require("./bot");
const { receiveTextFromBot } = require("./utils");

const handleStartCommand = (chatId) => {
  bot.sendMessage(
    chatId,
    "Вітаю. Це телеграм бот Вінницького центру служби крові. Тут ви можете дізнатись всю необхідну інформацію про донорство. А також будете отримувати інформацію про необхідну кров."
  );
};

const handleInfoCommand = (chatId) => {
  bot.sendMessage(
    chatId,
    "Комунальне некомерційне підприємство 'Вінницький обласний центр служби крові' Вінницької обласної Ради заготовляє цільну кров і тромбоцитну масу. Плазму крові центр тимчасово не заготовляє, адже в умовах воєнного стану в пріоритеті цільна кров для забезпечення потреб військових та цивільного населення. У центрі крові приймають донорів будь-яким з місцем реєстрації. Для кроводачі донорам потрібно мати з собою паспорт та ідентифікаційний код (якщо це ID-картка - то довідку про місце реєстрації). Також підходить застосунок ДІЯ. У центрі крові приймають тромбоцитну масу у жінок у середині менструального циклу."
  );
};

const handleContactsCommand = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Сторінки в соцмережах : \nhttps://www.facebook.com/donorvn/ \nhttps://www.instagram.com/vinnytsia_bloodservice/ \n\nГрафік роботи: \n🔹Понеділок - п'ятниця з 8:00 до 15:00 \n🔹Субота з з 8:00 до 13:00 \n🔹Неділя - вихідний \n\n☎️ Контакти: +380432551575, +380674920034\n\n📍 Адреса: вул. Пирогова 48, м.Вінниця, 21018"
  );
  await bot.sendLocation(chatId, 49.22877875159059, 28.450781729447773);
};

const handleSendMessage = async (selectedUserIds, bloodGroup) => {
  try {
    console.log("Selected User IDs:", selectedUserIds);
    
    const message =
      "'Вінницький обласний центр служби крові' потребує донора крові: " + bloodGroup + ". Очікуємо Вас!";

    const users = await Donor.find({ userId: { $in: selectedUserIds } });

    console.log("Users retrieved:", users);

    for (const user of users) {
      const { userId } = user;
      console.log("Sending message to:", userId);
      await bot.sendMessage(userId, message);
      console.log("Message sent to:", userId);
    }
    //await handleInfoCommand(userId)
    //await handleContactsCommand(userId)
    console.log("Messages sent successfully!");
  } catch (error) {
    console.error("Error sending messages:", error);
    throw error;
  }
};

const handleRegisterCommand = async (msg, chatId) => {
  const existingDonor = await Donor.findOne({ userId: chatId });
  if (existingDonor) {
    console.log(existingDonor);
    await bot.sendMessage(chatId, "Ваc уже зареєстровано!");
    return;
  }

  await bot.sendMessage(chatId, "Вкажіть Ваш номер телефону:");
  const phoneNumberResponse = await receiveTextFromBot();
  const phoneNumber = phoneNumberResponse.text;

  await bot.sendMessage(chatId, "Вкажіть Ваше ім'я:");
  const firstNameResponse = await receiveTextFromBot();
  const firstName = firstNameResponse.text;

  await bot.sendMessage(chatId, "Вкажіть Ваше прізвище:");
  const surnameResponse = await receiveTextFromBot();
   //mock for bot
  const surname = surnameResponse.text;
  console.log(msg.from);

  const donor = {
    userId: chatId,
    username: msg.from.username || firstName,
    phoneNumber,
    firstName,
    surname,
  };

  await Donor.create(donor);

  await bot.sendMessage(chatId, "Вас успішно зареєстровано!");
};

module.exports = {
  handleContactsCommand,
  handleInfoCommand,
  handleRegisterCommand,
  handleStartCommand,
  handleSendMessage,
};
