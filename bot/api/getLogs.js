const LogMessage = require('../Models/LogMessage');

const getLogs = async (request, response) => {
    try {
        const logs = await LogMessage.find().sort({ timestamp: -1 });
        response.json(logs);
        console.log(logs);
    } catch (error) {
        console.error(error);
        response.status(500).send('Server Error');
    }
};
module.exports = { getLogs };
