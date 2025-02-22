import mongoose from "mongoose";

const ChatModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [{ text: String, sender: String, timestamp: Date }],
});

const ChattingModel = mongoose.model("ChattingModel", ChatModel);
export default ChattingModel;
