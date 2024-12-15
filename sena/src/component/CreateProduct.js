import React, { useState } from "react";
import "../component/product.css";
import { useDispatch } from "react-redux";
import { createProduct } from "./Redux.js/Reducer";

export default function CreateProduct() {
  const [formdata, setForm] = useState({
    description: "",
    name: "",
    price: "",
    discountPercentage: "",
  });
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isNaN(formdata.price) ||
      formdata.price < 0 ||
      isNaN(formdata.discountPercentage) ||
      formdata.discountPercentage < 0
    ) {
      alert("Please enter valid price and discount percentage");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formdata.name);
    formDataToSend.append("description", formdata.description);
    formDataToSend.append("price", formdata.price);
    formDataToSend.append("discountPercentage", formdata.discountPercentage);
    if (image) {
      formDataToSend.append("image", image);
    }
    console.log(formDataToSend);
    dispatch(createProduct(formDataToSend));
    setForm({ description: "", name: "", price: "", discountPercentage: "" });
  };

  return (
    <div className="product-form-container">
      <h1 className="form-title">Create a Product</h1>
      <form
        className="product-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            required
            value={formdata.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            required
            value={formdata.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            required
            value={formdata.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="discountedPrice">Discounted Price</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            placeholder="Enter discounted price"
            onChange={handleInputChange}
            value={formdata.discountPercentage}
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Product
        </button>
      </form>
    </div>
  );
}
