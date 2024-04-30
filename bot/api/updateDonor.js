const Donor = require('../Models/Donor');

const updateDonor = async (request, res) => {
  try {
    const donorId = request.params.id;
    const donorUpdates = request.body;

    const updatedDonor = await Donor.findByIdAndUpdate(donorId, donorUpdates, {
      new: true,
    });

    if (!updatedDonor) {
      return res.status(404).send('Donor not found');
    }

    res.json(updatedDonor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
module.exports = { updateDonor };
