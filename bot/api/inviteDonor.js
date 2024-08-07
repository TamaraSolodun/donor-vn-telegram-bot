const { handleInviteDonor } = require('../handleFunctions');

const inviteDonor = async (request, response) => {
    try {
        const { phoneNumber, message } = request.body;

        await handleInviteDonor(phoneNumber, message);

        response.status(200).send('Invite sent successfully!');
    } catch (error) {
        console.error('Error sending invite:', error);
        response.status(500).send('Server Error');
    }
};
module.exports = { inviteDonor };

