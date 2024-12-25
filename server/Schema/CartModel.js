import mongoose from "mongoose";

const Carts = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", Carts);
export default Cart;
