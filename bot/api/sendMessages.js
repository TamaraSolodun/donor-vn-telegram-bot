const { handleSendMessage } = require('../handleFunctions');

const sendMessages = async (request, res) => {
  try {
    const { selectedUserIds, bloodGroup } = request.body;

    await handleSendMessage(selectedUserIds, bloodGroup);

    res.status(200).send('Messages sent successfully!');
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).send('Internal Server Error');
  }
};
module.exports = { sendMessages };
