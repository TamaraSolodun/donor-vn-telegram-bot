const Donor = require('../Models/Donor');

const getDonorById = async (request, response) => {
  const id = request.params.userId;
  console.log(typeof id);
  try {
    const donor = await Donor.findOne({ userId: Number(id) });
    if (!donor) {
      return response.status(404).json({ message: 'Donor not found' });
    }
    response.json(donor);
  } catch (error) {
    console.error(error);
    response.status(500).send('Server Error');
  }
};

module.exports = { getDonorById };
