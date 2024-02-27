const user = require("../Models/userModel.js");
const Chat = require("../Models/chatModel.js");

const accessChats = async (req, res) => {
  const { userId } = req.body;
  if (!userId) res.send({ message: "Provide User's Id" });
  let chatExists = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  chatExists = await user.populate(chatExists, {
    path: "latestMessage.sender",
    select: "email",
  });
  if (chatExists.length > 0) {
    res.status(200).send(chatExists[0]);
  } else {
    let data = {
      chatName: "sender",
      users: [userId, req.rootUserId],
      isGroup: false,
    };
    try {
      const newChat = await Chat.create(data);
      const chat = await Chat.find({ _id: newChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

const fetchAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.rootUserId } },
    })
      .populate("users")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    const finalChats = await user.populate(chats, {
      path: "latestMessage.sender",
      select: "email",
    });
    res.status(200).json(finalChats);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

export { accessChats, fetchAllChats };
