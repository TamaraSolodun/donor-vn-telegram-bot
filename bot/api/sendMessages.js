const { handleSendMessage } = require('../handleFunctions');

const sendMessages = async (request, response) => {
  try {
    const { selectedUserIds, bloodGroup, dateOfNextDonation, notes } = request.body;

    await handleSendMessage(selectedUserIds, bloodGroup, dateOfNextDonation, notes);

    response.status(200).send('Messages sent successfully!');
  } catch (error) {
    console.error('Error sending messages:', error);
    response.status(500).send('Server Error');
  }
};
module.exports = { sendMessages };
