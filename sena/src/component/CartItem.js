import React from "react";
import { useUser } from "./storage/Context";
import "./Cart.css";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

const CartItem = () => {
  const { cart, setCart } = useUser();
  const cartData = cart;

  console.log("cart data is=>", cart);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/cart/${id}`, {
        withCredentials: true,
      });

      const uupdatedCart = cart.map((c) => ({
        ...c,
        item: c.items.filter((item) => item.productId._id !== id),
      }));
      setCart(uupdatedCart);
    } catch (error) {
      console.error(
        "Error removing product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
      </div>
      {cartData.map((cart) => (
        <div key={cart._id}>
          {/* User Details */}
          <div className="user-details">
            <h2> Hi...{cart.userId.name}</h2>
            <h3>Email: {cart.userId.email}</h3>
          </div>
          <Link to={"/product"}>
            <div className="backward">
              <h2>
                <FaArrowLeft /> Back to product
              </h2>
            </div>
          </Link>

          {/* Cart Items */}
          <div className="cart-items">
            {cart.items.map((item, index) => {
              const discountedPrice = calculateDiscountedPrice(
                item.productId.price,
                item.productId.discountPercentage
              );
              return (
                <div className="cart-item" key={index}>
                  <img
                    src={`http://localhost:8000/image/${item.productId.Image} `}
                    alt={item.productId.name}
                  />
                  <div className="cart-item-content">
                    <h4>{item.productId.name}</h4>
                    <p> {item.productId.description}</p>
                    <p>
                      Original Price: <span>${item.productId.price}</span>
                    </p>
                    <p>
                      Discount Percentage:{" "}
                      <span>{item.productId.discountPercentage}%</span>
                    </p>
                    <p>
                      Discounted Price:{" "}
                      <span>${discountedPrice.toFixed(2)}</span>
                    </p>
                    <p>
                      Quantity: <span>{item.quantity}</span>
                    </p>
                    <button
                      className="btn"
                      onClick={() => deleteItem(item.productId._id)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="cart-footer">
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  );
};

export default CartItem;
