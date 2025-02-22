import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io"; // Correct import for Socket.IO
import { GoogleGenerativeAI } from "@google/generative-ai";

// Import Routes
import { FilterRouter } from "./Controller/Filter.js";
import DatabaseConfig from "./Database/DatabaseConfig.js";
import { UserRotes } from "./Controller/RegistrationPage.js";
import { OtpRouter } from "./Controller/OptRotes.js";
import { ProductRoutes } from "./Controller/Product.js";
import { ProductRatingRouter } from "./Controller/Rating.js";
import { CartRouter } from "./Controller/Cart.js";
import ChattingModel from "./Schema/ChattingModel.js";
import { ChatRouter } from "./Controller/ChatAPi.js";

dotenv.config();

const app = express();
const genAI = new GoogleGenerativeAI(process.env.ai);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/image", express.static(path.join(__dirname, "image")));

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/register", UserRotes);
app.use("/api/verification", OtpRouter);
app.use("/api/product", ProductRoutes);
app.use("/api/rating", ProductRatingRouter);
app.use("/api/filterProduct", FilterRouter);
app.use("/api/cart", CartRouter);
app.use("/api/chat", ChatRouter);

const generateAIResponse = async (message) => {
  try {
    const result = await model.generateContentStream(message);
    let aiResponse = "";

    for await (const chunk of result.stream) {
      aiResponse += chunk.text();
    }

    return aiResponse || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("AI Error:", error.message);
    return "AI is currently unavailable.";
  }
};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("chat message", async ({ userId, message }) => {
    console.log("Received message:", message, "and user is:", userId);

    await ChattingModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: { text: message, sender: "user", timestamp: new Date() },
        },
      },
      { upsert: true, new: true }
    );

    const botReply = await generateAIResponse(message);

    io.emit("reply from back", { text: botReply, sender: "AI" });
    await ChattingModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: { text: botReply, sender: "AI", timestamp: new Date() },
        },
      },
      { upsert: true, new: true }
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  DatabaseConfig();
  console.log(`Server is running on port ${PORT}`);
});
