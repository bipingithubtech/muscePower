import express from "express";
import ChattingModel from "../Schema/ChattingModel.js";
import { jwtMiddleware } from "../Middleware/jwtToken.js";

export const ChatRouter = express.Router();

ChatRouter.get("/:userId", jwtMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const chat = await ChattingModel.findOne({ userId });
    res.json(chat ? chat.messages : []);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
