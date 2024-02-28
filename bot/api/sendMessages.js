const { handleSendMessage } = require("../handleFunctions");

const sendMessages = async (req, res) => {
  try {
    const { selectedUserIds } = req.body;

    await handleSendMessage(selectedUserIds);

    res.status(200).send("Messages sent successfully!");
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { sendMessages };
