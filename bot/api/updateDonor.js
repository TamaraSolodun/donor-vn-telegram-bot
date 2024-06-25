const Donor = require('../Models/Donor');

const updateDonor = async (request, response) => {
  try {
    const donorId = request.params.id;
    const donorUpdates = request.body;

    const updatedDonor = await Donor.findOneAndUpdate({ userId: donorId }, donorUpdates, { new: true });

    if (!updatedDonor) {
      return response.status(404).send('Donor not found');
    }

    response.json(updatedDonor);
  } catch (error) {
    console.error('Error updating donor:', error);
    response.status(500).send('Server Error');
  }
};
module.exports = { updateDonor };
