const mongoose = require('mongoose');

const LogMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: {type: String, required: true},
  surname: {type: String, required: true},
  success: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
  messageType: { type: String, required: true },
  messageProps: {
    bloodGroup: { type: String, required: false },
    dateOfNextDonation: { type: String, required: false },
  },
});

module.exports = mongoose.model('logs', LogMessageSchema);

