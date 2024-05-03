const Donor = require('../Models/Donor');

const getDonors = async (request, response) => {
  try {
    const donors = await Donor.find();
    response.json(donors);
    console.log(donors);
  } catch (error) {
    console.error(error);
    response.status(500).send('Server Error');
  }
};

module.exports = { getDonors };
