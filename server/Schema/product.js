import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  Image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number, // Example: 40 for 40%
    required: true,
  },
});

ProductSchema.methods.getDiscountedPrice = function () {
  if (this.discountPercentage) {
    return this.price - (this.price * this.discountPercentage) / 100;
  }
  return this.price; // Return the original price if no discount is set
};

const Products = mongoose.model("Products", ProductSchema);

export default Products;
