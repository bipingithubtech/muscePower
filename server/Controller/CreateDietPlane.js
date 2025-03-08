import express from "express";
import RecommendPlan from "../Schema/DietModel.js";

import upload from "../multer/Multer.js";

export const DietRouter = express.Router();

DietRouter.post("/createDiet", upload.single("image"), async (req, res) => {
  try {
    const { title, calories, protein, carbohydrates, fat, category, time } =
      req.body;
    const image = req.file ? req.file.filename : null;
    const newDiet = new RecommendPlan({
      title,
      calories,
      protein,
      carbohydrates,
      fat,
      image,
      category,
      time,
    });
    const saveDiet = await newDiet.save();
    if (saveDiet) {
      res.status(200).json({ message: "sucessfuly added", Diet: saveDiet });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating Diet", error });
  }
});

DietRouter.get("/categories", async (req, res) => {
  try {
    const { categories, bmiCategory } = req.query;
    let calorieRange = {};
    if (bmiCategory === "underweight") {
      calorieRange = { $gte: 250, $lte: 400 };
    } else if (bmiCategory === "normal") {
      calorieRange = { $gte: 150, $lte: 250 };
    } else if (bmiCategory === "overweight") {
      calorieRange = { $gte: 100, $lte: 200 };
    } else if (bmiCategory === "obese") {
      calorieRange = { $gte: 50, $lte: 150 };
    } else {
      return res.status(400).json({ message: "Invalid BMI category" });
    }
    const diets = await RecommendPlan.find({
      calories: calorieRange,
      category: categories ? { $in: [categories] } : { $exists: true },
    });
    res.status(200).json(diets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
