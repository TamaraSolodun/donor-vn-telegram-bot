const Donor = require('../Models/Donor');

const createDonor = async (request, response) => {
  try {
    const newDonor = new Donor(request.body);

    await newDonor.save();

    response.status(201).json(newDonor);
  } catch (error) {
    console.error('Error creating donor:', error);
    response.status(500).send('Server Error');
  }
};

module.exports = { createDonor };