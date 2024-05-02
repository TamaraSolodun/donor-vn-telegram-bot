const Donor = require("../Models/Donor");

const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
    console.log(donors)
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getDonors };
