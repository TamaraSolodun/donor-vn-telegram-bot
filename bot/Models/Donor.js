const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  dateOfBirth: { type: String, default: null },
  sex: { type: String, default: null },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  bloodType: { type: String, default: null },
  rhesusFactor: { type: String, default: null },
  city: { type: String, default: null },
});


module.exports = mongoose.model("donors", donorSchema);