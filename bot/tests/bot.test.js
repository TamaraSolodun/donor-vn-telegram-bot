const request = require('supertest');
const server = require('../server');
const Donor = require('../Models/Donor');
const bot = require('../bot');
const mongoose = require('mongoose');
const token = require('../config.js');

const { receiveTextFromBot } = require('../utils');
const { handleContactsCommand, handleInfoCommand, handleRegisterCommand, handleStartCommand } = require('../handleFunctions');

jest.mock('../bot.js', () => {
    return {
        once: jest.fn(),
        sendMessage: jest.fn(), 
        sendLocation: jest.fn(),
        setWebHook: jest.fn(),
        setPolling: jest.fn(),
        stopPolling: jest.fn(),
    };
});


jest.mock('../utils', () => ({
    receiveTextFromBot: jest.fn(),
}));

const mockDonors = [
    {
        userId: 1,
        username: 'ts',
        phoneNumber: '+380123456789',
        firstName: 'T',
        surname: 'S',
    },
    {
        userId: 2,
        username: 'st',
        phoneNumber: '+380987654321',
        firstName: 'S',
        surname: 'T',
    },
];

describe('Bot command handlers', () => {
    
    beforeAll(async () => {
        await mongoose.connect(token.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        bot.stopPolling();
    });

    afterEach(() => {
        bot.stopPolling();
        jest.restoreAllMocks();
    });

    it('should handle /start command', async () => {
        const chatId = 12345;
        await handleStartCommand(chatId);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            'Вітаю. Це телеграм бот Вінницького центру служби крові. Тут ви можете дізнатись всю необхідну інформацію про донорство. А також будете отримувати інформацію про необхідну кров.'
        );
    });

    it('should handle /info command', async () => {
        const chatId = 12345;
        await handleInfoCommand(chatId);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            "Комунальне некомерційне підприємство 'Вінницький обласний центр служби крові' Вінницької обласної Ради заготовляє цільну кров і тромбоцитну масу. Плазму крові центр тимчасово не заготовляє, адже в умовах воєнного стану в пріоритеті цільна кров для забезпечення потреб військових та цивільного населення. У центрі крові приймають донорів будь-яким з місцем реєстрації. Для кроводачі донорам потрібно мати з собою паспорт та ідентифікаційний код (якщо це ID-картка - то довідку про місце реєстрації). Також підходить застосунок ДІЯ. У центрі крові приймають тромбоцитну масу у жінок у середині менструального циклу.",
        );
    });

    it('should handle /contacts command', async () => {
        const chatId = 12345;
        await handleContactsCommand(chatId);

        expect(bot.sendMessage).toHaveBeenCalledWith(
            chatId,
            "Сторінки в соцмережах : \nhttps://www.facebook.com/donorvn/ \nhttps://www.instagram.com/vinnytsia_bloodservice/ \n\nГрафік роботи: \n🔹Понеділок - п'ятниця з 8:00 до 15:00 \n🔹Субота з з 8:00 до 13:00 \n🔹Неділя - вихідний \n\n☎️ Контакти: +380432551575, +380674920034\n\n📍 Адреса: вул. Пирогова 48, м.Вінниця, 21018",
        );
        expect(bot.sendLocation).toHaveBeenCalledWith(chatId, 49.228_778_751_590_59, 28.450_781_729_447_773);
    });
    
    it('should handle /registration command', async () => {
        const chatId = 12345;
        const message = {
          from: { username: 'test_user' },
        };
    
        jest.spyOn(Donor, 'findOne').mockResolvedValue(null);
        jest.spyOn(Donor, 'create').mockResolvedValue(mockDonors[0]);
        receiveTextFromBot
          .mockResolvedValueOnce({ text: '+380123456789' })
          .mockResolvedValueOnce({ text: 'Test' })
          .mockResolvedValueOnce({ text: 'User' });
    
        await handleRegisterCommand(message, chatId);
    
        expect(Donor.create).toHaveBeenCalledWith({
          userId: chatId,
          username: 'test_user',
          phoneNumber: '+380123456789',
          firstName: 'Test',
          surname: 'User',
        });
      });

});
