const Donor = require('../Models/Donor');

const deleteDonor = async (request, response) => {
    try {
        const donorId = request.params.id;

        const deletedDonor = await Donor.findOneAndDelete({ userId: donorId });

        if (!deletedDonor) {
            return response.status(404).send('Donor not found');
        }

        response.json({ message: 'Donor successfully deleted', deletedDonor });
    } catch (error) {
        console.error('Error deleting donor:', error);
        response.status(500).send('Server Error');
    }
};

module.exports = { deleteDonor };