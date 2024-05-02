const Donor = require("../Models/Donor");

const getDonorById = async (req, res) => {
    const id = req.params.userId;
    console.log(typeof id)
    try {
        const donor = await Donor.findOne({ userId: Number(id) });
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }
        res.json(donor);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

module.exports = { getDonorById };
