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

CartRouter.delete("/:productId", jwtMiddleware, async (req, res) => {
  try {
    const { productId } = req.params; // Extract productId from the request parameters
    const userId = req.user?._id; // Ensure req.user is defined

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("Params: ", req.params);

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Log the items for debugging
    // console.log("Cart items before removal: ", cart.items);

    // Remove the product from the items array
    const updatedItems = cart.items.filter(
      (item) => (item.productId._id || item.productId).toString() !== productId
    );

    if (cart.items.length === updatedItems.length) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", cart });
    }

    // Update the cart's items
    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({ message: "Product removed successfully", cart });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ message: "Server error", error });
  }
});
