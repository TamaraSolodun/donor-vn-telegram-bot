const Donor = require("../Models/Donor");

const updateDonor = async (req, res) => {
    try {
      const donorId = req.params.id; 
      const donorUpdates = req.body; 
    
      const updatedDonor = await Donor.findByIdAndUpdate(donorId, donorUpdates, { new: true }); 
  
      if (!updatedDonor) {
        return res.status(404).send("Donor not found"); 
      }
  
      res.json(updatedDonor); 
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error"); 
    }
  };
module.exports = { updateDonor };
