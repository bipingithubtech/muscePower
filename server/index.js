import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import DatabaseConfig from "./Database/DatabaseConfig.js";
import { UserRotes } from "./Controller/RegistrationPage.js";
import { OtpRouter } from "./Controller/OptRotes.js";
import { ProductRoutes } from "./Controller/Product.js";
import { ProductRatingRouter } from "./Controller/Rating.js";
dotenv.config();

const app = express();
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

app.use("/api/register", UserRotes);
app.use("/api/verification", OtpRouter);
app.use("/api/product", ProductRoutes);
app.use("/api/rating", ProductRatingRouter);
app.listen(PORT, () => {
  DatabaseConfig();
  console.log(`Server is running on port ${PORT}`);
});
