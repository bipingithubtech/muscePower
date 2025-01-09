import express from "express";
import { getChatResponse } from "../chatUtility.js";

export const ChatRouter = express.Router();

ChatRouter.post("/chating", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const botResponse = await getChatResponse(userMessage);
    res.json({ reply: botResponse });
  } catch {
    res.status(500).json({ error: "Failed to process the message." });
  }
});
