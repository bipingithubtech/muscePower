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
