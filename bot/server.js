const express = require("express");
const cors = require("cors");

const { getDonors } = require("./api/getDonors.js");
const { updateDonor } = require("./api/updateDonor.js");

const { sendMessages } = require("./api/sendMessages.js");
const token = require("./config.js");

const mongoose = require("mongoose");
const { getDonorById } = require("./api/getDonorById.js");
mongoose.connect(token.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/donors", getDonors);
app.get("/api/donors/:userId", getDonorById);
app.post("/api/sendMessages", sendMessages);
// app.put("/api/donors/:id", updateDonor);

module.exports = app;