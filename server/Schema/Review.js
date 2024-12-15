import mongoose from "mongoose";

const ProductReview = mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: "Products" },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Reviews = mongoose.model("Reviews", ProductReview);
export default Reviews;
