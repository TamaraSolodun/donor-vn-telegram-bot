const mongoose = require('mongoose');
//match validator
//required with function
const donorSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+380\d{9}$/.test(v);
      },
      message: (properties) =>
        `${properties.value} is not a valid phone number! It should start with +380 and have a total of 12 digits.`,
    },
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-z]{2,}$/i.test(v);
      },
      message: (properties) =>
        `${properties.value} is not a valid first name! It should contain only letters and be at least 2 characters long.`,
    },
  },
  surname: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-z]{2,}$/i.test(v);
      },
      message: (properties) =>
        `${properties.value} is not a valid surname! It should contain only letters and be at least 2 characters long.`,
    },
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
