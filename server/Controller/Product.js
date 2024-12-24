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
        discountPercentage: Number(discountPercentage) || 0, // Assign correctly
      });

      // Save the product to the database
      const savedProduct = await createProduct.save();

      // Use the method to calculate the discounted price
      const discountPrice = savedProduct.getDiscountedPrice();

      // Send response
      res.status(201).json({
        message: "Product created successfully",
        product: {
          ...savedProduct.toObject(), // Convert Mongoose document to plain object
          discountPrice, // Include the calculated discounted price in the response
        },
        imageUrl: `/image/${image}`, // Include the image URL in the response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating product", error });
    }
  }
);

ProductRoutes.get("/getAll", async (req, res) => {
  try {
    const products = await Products.find({});

    if (products) {
      // Add the full image URL to each product
      const productsWithImageUrl = products.map((product) => ({
        ...product.toObject(),
        imageUrl: `/image/${product.Image}`,
        discountPrice: product.getDiscountedPrice(), // Ensure that image URL is returned correctly
      }));
      res.status(200).json({
        message: "All products fetched successfully",
        products: productsWithImageUrl,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});
