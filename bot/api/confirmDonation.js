const { handleConfirmDonation } = require('../handleFunctions');

const confirmDonation = async (request, response) => {
  try {
    const { selectedUserIds, dateOfNextDonation } = request.body;

    await handleConfirmDonation(selectedUserIds, dateOfNextDonation);

    response.status(200).send('Messages sent successfully!');
  } catch (error) {
    console.error('Error sending messages:', error);
    response.status(500).send('Server Error');
  }
};
module.exports = { confirmDonation };
