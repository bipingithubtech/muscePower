import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bmi: Number,
  bmr: Number,
  meals: [String],
  exercises: [String],
  createdAt: { type: Date, default: Date.now },
});

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);
export default DietPlan;
