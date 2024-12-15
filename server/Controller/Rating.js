import express from "express";
import { jwtMiddleware } from "../Middleware/jwtToken.js";
import Reviews from "../Schema/Review.js";

export const ProductRatingRouter = express.Router();

ProductRatingRouter.post("/createRating", jwtMiddleware, async (req, res) => {
  const { productId, rating, comment } = req.body;

  const userID = req.user.id;
  console.log(req.user.email);

  try {
    const review = new Reviews({
      productId,
      userID,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});
