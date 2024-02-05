const { randEmail, randFullName } = require("@ngneat/falso");
//import {global.Promise} from "bluebird";
const TelegramApi = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const express = require("express");

const Donor = require("./Models/Donor.js");

const token = "6923650844:AAER4Eb1Qm7H5iXMPe7BtkAk6HbLwOKdwOE";
const mongoURI =
  "mongodb+srv://donation:1234@cluster0.drv9hc8.mongodb.net/DonorsVN";
const webAppUrl = "https://www.google.com.ua/?hl=uk";
const bot = new TelegramApi(token, { polling: true });
module.exports = bot ;
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const {
  handleContactsCommand,
  handleInfoCommand,
  handleRegisterCommand,
  handleStartCommand,
  handleSendMessage,
} = require("./handleFunctions.js");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(cors());
app.use(express.json());
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/sendMessages", async (req, res) => {
  try {
    const { selectedUserIds } = req.body;

    await handleSendMessage(selectedUserIds);

    res.status(200).send("Messages sent successfully!");
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

// const environment = process.env.NODE_ENV || "development";
// dotenv.config({ path: `.env.${environment}` });

// const databaseUrl = process.env.DATABASE_URL_DEV || "default_database_url";
// const apiKey = process.env.API_KEY || "default_api_key";

// console.log(`Database URL: ${databaseUrl}`);
// console.log(`API Key: ${apiKey}`);
// //add generated data file by npm -> https://ngneat.github.io/falso/docs/getting-started

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("Connected to the database");

//     return mongoose.connection;
//   } catch (error) {
//     console.error("Error connecting to the database", error);
//     throw error;
//   }
// };

const start = async () => {
  //const db = await connectToDatabase();

  bot.setMyCommands([
    { command: "/start", description: "Початкове привітання" },
    { command: "/info", description: "Інформація про Вінницький центр крові" },
    {
      command: "/contacts",
      description: "Контакти і місцерозташування центру",
    },
    { command: "/registration", description: "Зареєструватись" },
    // { command: "/sendNotification", description: "Send notification to users" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        handleStartCommand(chatId);
      } else if (text === "/info") {
        handleInfoCommand(chatId);
      } else if (text === "/contacts") {
        await handleContactsCommand(chatId);
      }
      if (text === "/registration") {
        await handleRegisterCommand(msg, chatId);
      }
    } catch (e) {
      console.error("Error during registration:", e);
      return bot.sendMessage(chatId, "Щось пішло не так!)");
    }
  });
};

start();
