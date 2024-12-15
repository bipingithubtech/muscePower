import express from "express";
import upload from "../multer/Multer.js"; // Multer configuration file
import Products from "../Schema/product.js";

export const ProductRoutes = express.Router();

// Create a new product
ProductRoutes.post(
  "/createProduct",
  upload.single("image"),
  async (req, res) => {
    try {
      const { description, name, price, discountPercentage } = req.body;

      // Get uploaded image details
      const image = req.file ? req.file.filename : ""; // Multer saves the filename
      console.log(req.body);
      console.log(req.file);

      if (!image) {
        return res.status(400).json({ message: "Image file not found" });
      }
      // Create the product
      const createProduct = new Products({
        Image: image,
        description,
        name,
        price: Number(price) || 0,
        discountPercentage: Number(discountPercentage) || 0,
      });

      // Save the product to the database
      const savedProduct = await createProduct.save();

      const discountPrice = savedProduct.getDiscountedPrice();

      // Send response
      res.status(201).json({
        message: "Product created successfully",
        product: createProduct,
        discountPrice,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating product", error });
    }
  }
);

ProductRoutes.get("/getAll", async (req, res) => {
  try {
    const user = await Products.find({});

    if (user) {
      res.status(200).json({ message: "all post together", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product", error });
  }
});
