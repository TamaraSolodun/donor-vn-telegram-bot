const request = require('supertest');
const server = require('../server');
const Donor = require('../Models/Donor');
const mongoose = require('mongoose');

jest.mock('../bot.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            once: jest.fn(),
            setWebHook: jest.fn(),
            setPolling: jest.fn(),
            stopPolling: jest.fn(),
            sendMessage: jest.fn(),
        };
    });
});


const bot = require('../bot.js');;
const token = require('../config.js');


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

describe('GET /api/donors', () => {
    afterEach(() => {
        bot.stopPolling();
        jest.restoreAllMocks();
    });
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
    it('should fetch all donors', async () => {

        jest.spyOn(Donor, 'find').mockResolvedValue(mockDonors);

        const response = await request(server).get('/api/donors');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDonors);
    });

    it('should return a 500 error if there is a server error', async () => {
        const errorMessage = 'Server Error';
        jest.spyOn(Donor, 'find').mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const response = await request(server)
            .get('/api/donors');

        expect(response.status).toBe(500);
        expect(response.text).toEqual('Server Error');
    });
});

describe('GET /api/donors/:userId', () => {
    afterEach(() => {
        bot.stopPolling();
        jest.restoreAllMocks();
    });
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
    it('should fetch a donor by user id', async () => {
        jest.spyOn(Donor, 'findOne').mockResolvedValue(mockDonors);

        const response = await request(server).get(`/api/donors/${mockDonors.userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDonors);
    });

    it('should return a 404 error if the donor is not found', async () => {
        jest.spyOn(Donor, 'findOne').mockResolvedValue(null);

        const response = await request(server).get('/api/donors/1');

        expect(response.status).toBe(404);
    });

    it('should return a 500 error if there is a server error', async () => {
        const errorMessage = 'Server Error';
        jest.spyOn(Donor, 'findOne').mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const response = await request(server).get('/api/donors/1');

        expect(response.status).toBe(500);
        expect(response.text).toBe(errorMessage);
    });
});



describe('POST /api/sendmessage', () => {
    afterEach(() => {
        bot.stopPolling();
        jest.restoreAllMocks();
    });
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

    it('should send messages to selected users', async () => {

        jest.spyOn(Donor, 'find').mockResolvedValue(mockDonors);

        const selectedUserIds = [1, 2];
        const bloodGroup = 'A+';

        const response = await request(server)
            .post('/api/sendmessage')
            .send({ selectedUserIds, bloodGroup });

        expect(bot.sendMessage).toHaveBeenCalledTimes(selectedUserIds.length);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Messages sent successfully!');
    });

    it('should return a 500 error if there is a server error', async () => {
        const errorMessage = 'Server Error';
        jest.spyOn(Donor, 'find').mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const selectedUserIds = [1, 2];
        const bloodGroup = 'A+';

        const response = await request(server)
            .post('/api/sendmessage')
            .send({ selectedUserIds, bloodGroup });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Internal Server Error');
    });
})