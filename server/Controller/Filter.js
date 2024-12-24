import express from "express";
import Products from "../Schema/product.js";

export const FilterRouter = express.Router();

FilterRouter.get("/filter", async (req, res) => {
  try {
    const { name, minPrice, maxPrice, discountPrice } = req.query;
    console.log(req.query);
    const filterProduct = {};
    if (maxPrice || minPrice) {
      filterProduct.price = {};
      if (minPrice) filterProduct.price.$gte = Number(minPrice);
      if (maxPrice) filterProduct.price.$lte = Number(maxPrice);
    }

    if (name) {
      filterProduct.name = { $regex: name, $options: "i" };
    }
    if (discountPrice) {
      filterProduct.discountPercentage = Number(discountPrice);
    }
    const filter = await Products.find(filterProduct);

    const productWithDeatil = filter.map((product) => ({
      ...product.toObject(),
      imageUrl: `/image/${product.Image}`,
      discountPrice: product.getDiscountedPrice(),
    }));
    res.status(200).json(productWithDeatil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
