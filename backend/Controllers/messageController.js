const Message = require("../Models/messageModel.js");
const Chat = require("../Models/chatModel.js");

const sendMessage = async (req, res) => {
  const rootUserId = req.user.userId;
  const { chatId, message } = req.body;
  try {
    let msg = await Message.create({ sender: rootUserId, message, chatId });
    msg = await (
      await msg.populate("sender", "email")
    ).populate({
      path: "chatId",
      select: "chatName users",
      model: "Chat",
      populate: {
        path: "users",
        select: "email",
        model: "User",
      },
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: msg,
    });
    res.status(200).send(msg);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    let messages = await Message.find({ chatId })
      .populate({
        path: "sender",
        model: "User",
        select: "email",
      })
      .populate({
        path: "chatId",
        model: "Chat",
      });

    res.status(200).json(messages);
  } catch (error) {
    res.sendStatus(500).json({ error: error });
    console.log(error);
  }
};

module.exports = { sendMessage, getMessages };
