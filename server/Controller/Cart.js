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

    const ExistingProduct = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (ExistingProduct) {
      ExistingProduct.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    cart = await Cart.findOne({ userId });

    res
      .status(200)
      .json({ message: "Product added to cart successfully!", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart", error });
  }
});

CartRouter.get("/getAllProduct", async (req, res) => {
  try {
    const cartData = await Cart.find({})
      .populate("userId")
      .populate("items.productId");
    if (cartData) {
      res.status(200).json(cartData);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get product to cart", error });
  }
});
