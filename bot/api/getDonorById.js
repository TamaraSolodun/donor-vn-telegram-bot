const Donor = require('../Models/Donor');

const getDonorById = async (request, res) => {
  const id = request.params.userId;
  console.log(typeof id);
  try {
    const donor = await Donor.findOne({ userId: Number(id) });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { getDonorById };
