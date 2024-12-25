import express from "express";
import { jwtMiddleware } from "../Middleware/jwtToken.js";
import Cart from "../Schema/CartModel.js";

export const CartRouter = express.Router();

CartRouter.post("/Addcart", jwtMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push({ productId });

    await cart.save();
    cart = await Cart.findOne({ userId })
      .populate("userId")
      .populate("items.productId");
    res
      .status(200)
      .json({ message: "Product added to cart successfully!", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart", error });
  }
});
