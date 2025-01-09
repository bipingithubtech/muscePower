import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { Server } from "socket.io"; // Correct import for Socket.IO

// Import Routes
import { FilterRouter } from "./Controller/Filter.js";
import DatabaseConfig from "./Database/DatabaseConfig.js";
import { UserRotes } from "./Controller/RegistrationPage.js";
import { OtpRouter } from "./Controller/OptRotes.js";
import { ProductRoutes } from "./Controller/Product.js";
import { ProductRatingRouter } from "./Controller/Rating.js";
import { CartRouter } from "./Controller/Cart.js";

// Environment variables
dotenv.config();

const app = express();

// Create HTTP server and initialize Socket.IO with it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL (update if needed)
    credentials: true,
  },
});

// Get the directory path for serving images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "image" directory
app.use("/image", express.static(path.join(__dirname, "image")));

// Middleware setup
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

// Test Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const predefinedReplies = {
  hello: "Hi! How can I assist you today?",
  "i have problem with price issue":
    "Thank you for reaching out to us. Our team will shortly respond to you.",
  "call me": "Sure, our team will reach you within 24 hours!",
  thanks: "You're welcome! Let me know if you need anything else.",
};

const fallbackResponse =
  "I'm sorry, I didn't understand that. Could you rephrase?";
const getBotResponse = (userMessage) => {
  const lowerCaseMessage = userMessage.toLowerCase();
  for (const key in predefinedReplies) {
    if (lowerCaseMessage.includes(key)) {
      return predefinedReplies[key];
    }
  }
  return fallbackResponse;
};
// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Socket connected successfully!");

  // Event to handle chat messages or any other event
  socket.on("chat message", (msg) => {
    console.log("Received message:", msg);
    const botMessage = getBotResponse(msg);
    // Broadcast the message to all connected clients
    setTimeout(() => {
      socket.emit("repply from back", botMessage);
    }, 2000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  DatabaseConfig(); // Your database setup
  console.log(`Server is running on port ${PORT}`);
});
