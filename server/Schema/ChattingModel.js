import mongoose from "mongoose";

const ChatModel = new mongoose.Schema({
  message: String,
  timeStamp: Date,
});

const ChattingModel = mongoose.model("ChattingModel", ChatModel);
export default ChattingModel;
