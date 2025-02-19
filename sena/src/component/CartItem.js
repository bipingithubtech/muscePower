import React, { useEffect, useState } from "react";
import { useUser } from "./storage/Context";
import "./Cart.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DndContext, useDraggable } from "@dnd-kit/core";
import Dragbox from "./Dragbox";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

const CartItem = () => {
  const { cart: initialCart } = useUser();
  const [cart, setCart] = useState(initialCart || []);

  useEffect(() => {
    if (cart) {
      console.log("Cart Structure: ", cart);
      cart.forEach((cartItem, index) => {
        console.log(`Cart Item ${index}: `, cartItem);
      });
    }
  }, [cart]);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && over.id === "drop-area") {
      try {
        await axios.delete(`http://localhost:8000/api/cart/${active.id}`, {
          withCredentials: true,
        });

        const updatedCart = cart.map((cartItem) => ({
          ...cartItem,
          items: cartItem.items.filter(
            (item) => item.productId._id !== active.id
          ),
        }));

        setCart(updatedCart);

        toast.success("Product deleted successfully", {
          position: "top-right",
          autoClose: 500,
        });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
        </div>

        {cart?.map((cartItem) => (
          <div key={cartItem._id}>
            <div className="user-details">
              <h2>Hi... {cartItem.userId?.name || "User"}</h2>
              <h3>Email: {cartItem.userId?.email || "No Email"}</h3>
            </div>

            <Link to={"/product"}>
              <div className="backward">
                <h2>
                  <FaArrowLeft /> Back to product
                </h2>
              </div>
            </Link>

            <div className="cart-items">
              {cartItem.items?.map((item) => {
                const discountedPrice = calculateDiscountedPrice(
                  item.productId.price,
                  item.productId.discountPercentage
                );

                return (
                  <Draggable key={item.productId._id} id={item.productId._id}>
                    <div className="cart-item">
                      <img
                        src={`http://localhost:8000/image/${item.productId.Image}`}
                        alt={item.productId.name}
                      />
                      <div className="cart-item-content">
                        <h4>{item.productId.name}</h4>
                        <p>{item.productId.description}</p>
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
                      </div>
                    </div>
                  </Draggable>
                );
              })}
            </div>
          </div>
        ))}
        <ToastContainer
          className="custom-toast-container"
          position="top-center"
        />

        <Dragbox>
          <div className="dropbox">Drop items here</div>
        </Dragbox>
      </div>
    </DndContext>
  );
};

export default CartItem;
