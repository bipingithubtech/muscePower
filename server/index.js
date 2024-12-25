import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { jwtMiddleware } from "./Middleware/jwtToken.js";
// import fs from "fs";
import { FilterRouter } from "./Controller/Filter.js";

import DatabaseConfig from "./Database/DatabaseConfig.js";
import { UserRotes } from "./Controller/RegistrationPage.js";
import { OtpRouter } from "./Controller/OptRotes.js";
import { ProductRoutes } from "./Controller/Product.js";
import { ProductRatingRouter } from "./Controller/Rating.js";
import { CartRouter } from "./Controller/Cart.js";
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "image" directory
app.use("/image", express.static(path.join(__dirname, "image")));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 5000;
// app.get("/get-user", jwtMiddleware, (req, res) => {
//   // Accessing user details from req.user
//   const userId = req.user._id; // Get userId from decoded token
//   const email = req.user.email; // Access other data like email if present

//   // Log the user ID and full token payload
//   console.log("User ID:", userId);
//   console.log("Decoded Token Payload:", req.user);

//   // Send a response back with user info
//   res.send(userId, email).res.json({
//     message: "User info retrieved successfully",
//     userId: userId,
//     email: email,
//     fullTokenPayload: req.user,
//   });
// });
app.use("/api/register", UserRotes);
app.use("/api/verification", OtpRouter);
app.use("/api/product", ProductRoutes);
app.use("/api/rating", ProductRatingRouter);
app.use("/api/filterProduct", FilterRouter);
app.use("/api/cart", CartRouter);
app.listen(PORT, () => {
  DatabaseConfig();
  console.log(`Server is running on port ${PORT}`);
});
// fs.readdir("./image", (err, files) => {
// //   if (err) {
// //     console.error("Image folder not found or inaccessible:", err);
// //   } else {
// //     console.log("Files in image folder:", files);
// //   }
// // });
