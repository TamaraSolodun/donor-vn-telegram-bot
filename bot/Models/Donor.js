const mongoose = require('mongoose');
//match validator
//required with function
const donorSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  dateOfBirth: { type: String, default: null },
  sex: { type: String, default: null },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  bloodType: { type: String, default: null },
  rhesusFactor: { type: String, default: null },
  city: { type: String, default: null },
  dateOfLastDonation: { type: String, default: null },
  countOfDonations: { type: Number, default: null },
  dateOfNextDonation: { type: String, default: null },
  willDonate: { type: String, default: null }
});

module.exports = mongoose.model('donors', donorSchema);
