import mongoose from "mongoose";

const RecommendedDietSchema = new mongoose.Schema({
  title: { type: String, required: true },
  calories: { type: String, required: true },
  protein: { type: String, required: true },
  carbohydrates: { type: String, required: true },
  fat: { type: String, required: true },
  image: { type: String },
  category: {
    type: [String],
    enum: ["veg", "non-veg"],
    required: true,
  },
  time: {
    type: [String],
    enum: ["morning", "lunch", "dinner", "snack"],
    required: true,
  },
});

const RecommendPlan = mongoose.model("RecommendPlan", RecommendedDietSchema);
export default RecommendPlan;
