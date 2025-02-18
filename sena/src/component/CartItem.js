import React, { useEffect, useState } from "react";
import { useUser } from "./storage/Context"; // Assuming useUser is your context hook
import "./Cart.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DndContext, useDraggable } from "@dnd-kit/core";
import Dragbox from "./Dragbox";

// Draggable component
const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

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
  const { cart: initialCart } = useUser(); // Getting cart from context (if it's provided)
  const [cart, setCart] = useState(initialCart || []); // Setting cart in state

  // Effect hook to log cart structure when cart changes
  useEffect(() => {
    if (cart) {
      console.log("Cart Structure: ", cart);
      cart.forEach((cartItem, index) => {
        console.log(`Cart Item ${index}: `, cartItem);
        cartItem.items?.forEach((item, itemIndex) => {
          console.log(`Item ${itemIndex} ID: `, item._id);
        });
      });
    }
  }, [cart]);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "drop-area") {
      console.log(`Item ${active.id} was dropped into the drop area`);

      try {
      } catch (error) {}
      const updatedCart = cart.map((cartItem) => ({
        ...cartItem,
        items: cartItem.items.filter(
          (item) => item.productId._id !== active.id
        ),
      }));

      // Update the cart state with the updated cart
      setCart(updatedCart);
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

        <Dragbox>
          <div className="dropbox">Drop items here</div>
        </Dragbox>
      </div>
    </DndContext>
  );
};

export default CartItem;
