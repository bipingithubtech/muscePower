import React, { useEffect } from "react";
import { useUser } from "./storage/Context";
import "./Cart.css";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CartItem = () => {
  const { cart, setCart } = useUser(); // Assuming context is used to manage the cart state

  // Logging the cart structure for debugging
  useEffect(() => {
    console.log("Cart Structure: ", cart);
    cart.forEach((cartItem, index) => {
      console.log(`Cart Item ${index}: `, cartItem);
      cartItem.items.forEach((item, itemIndex) => {
        console.log(`Item ${itemIndex} ID: `, item._id); // Updated to use item._id
      });
    });
  }, [cart]);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside or in the same position, do nothing
    if (!destination || source.index === destination.index) {
      return;
    }

    const updatedCart = [...cart];

    // Find the specific cart and move the item
    const sourceCart = updatedCart.find(
      (board) => board._id === source.droppableId
    );
    const destinationCart = updatedCart.find(
      (board) => board._id === destination.droppableId
    );

    if (!sourceCart || !destinationCart) {
      console.error("Source or destination cart not found");
      return;
    }

    const [movedItem] = sourceCart.items.splice(source.index, 1);
    destinationCart.items.splice(destination.index, 0, movedItem);

    setCart(updatedCart);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {cart.map((cartItem, cartIndex) => (
          <div key={cartItem._id}>
            {" "}
            {/* Use cartItem._id as the key */}
            <div className="user-details">
              <h2>Hi... {cartItem.userId.name}</h2>
              <h3>Email: {cartItem.userId.email}</h3>
            </div>
            <Link to={"/product"}>
              <div className="backward">
                <h2>
                  <FaArrowLeft /> Back to product
                </h2>
              </div>
            </Link>
            <Droppable
              droppableId={cartItem._id.toString()}
              key={`droppable-${cartIndex}`}
            >
              {(provided) => (
                <div
                  className="cart-items"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cartItem.items.map((item, index) => {
                    const discountedPrice = calculateDiscountedPrice(
                      item.productId.price,
                      item.productId.discountPercentage
                    );

                    return (
                      <Draggable
                        key={item._id} // Ensure each draggable item has its own unique key
                        draggableId={item._id} // Use item._id as the draggableId
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="cart-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img
                              src={`http://localhost:8000/image/${item.productId.Image}`}
                              alt={item.productId.name}
                            />
                            <div className="cart-item-content">
                              <h4>{item.productId.name}</h4>
                              <p>{item.productId.description}</p>
                              <p>
                                Original Price:{" "}
                                <span>${item.productId.price}</span>
                              </p>
                              <p>
                                Discount Percentage:{" "}
                                <span>
                                  {item.productId.discountPercentage}%
                                </span>
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
                                onClick={() => {
                                  console.log(
                                    "Remove Item:",
                                    item.productId._id
                                  );
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* Cart Footer */}
            <div className="cart-footer">
              <p>Thank you for shopping with us!</p>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default CartItem;
