import React, { useRef, useState } from "react";
import data from "./storage/BlockBusterData";

const BlockBusterDeals = () => {
  const containerRef = useRef(null); // Define the container reference here

  // Function to scroll the container to the left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -250, // Move 250px to the left when clicking the left arrow
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  // Function to scroll the container to the right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 250, // Move 250px to the right when clicking the right arrow
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  // Function to apply discount and calculate price
  const calculateDiscount = (price) => {
    const discount = 40; // 40% discount
    const discountPrice = price - (price * discount) / 100;

    // Set the cost state with the discounted price rounded to two decimal places
    return discountPrice.toFixed(2); // Ensure cost is displayed as a string with 2 decimal points
  };

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Blockbuster Deals
        </h1>
      </div>

      {/* Container holding the arrows and images */}
      <div
        style={{
          display: "flex",
          alignItems: "center", // Center align the buttons and image container
          justifyContent: "center", // Center the whole block
          width: "1000px", // Fixed width for the container
          margin: "0 auto", // Center the whole container on the page
        }}
      >
        <button
          onClick={scrollLeft}
          style={{
            fontSize: "20px", // Smaller size for the arrow button
            padding: "5px",
            backgroundColor: "#ddd", // Background color for the button
            border: "none",
            cursor: "pointer", // Pointer cursor on hover
            zIndex: 10, // Make sure the button is on top
          }}
        >
          &#8592; {/* Left arrow */}
        </button>

        {/* Container for images */}
        <div
          ref={containerRef} // Reference for the scrollable container
          style={{
            display: "flex",
            gap: "10px", // Space between images
            overflowX: "hidden", // Hide the scrollbar
            width: "100%", // Take the full width of the parent container
            padding: "10px 0", // Vertical padding for images
            flexShrink: 0, // Prevent shrinking of the image container
          }}
        >
          {data.map((val, index) => {
            const discountedPrice = calculateDiscount(val.price);

            return (
              <div
                key={index}
                style={{
                  flex: "0 0 auto", // Prevent images from resizing
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", // Center the image inside the div
                  alignItems: "center",
                  padding: "10px",
                  width: "200px",
                  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
                  textAlign: "center", // Center text in each card
                }}
              >
                <img
                  style={{
                    width: "150px", // Image width fixed at 150px
                    height: "auto", // Maintain aspect ratio
                  }}
                  src={val.image}
                  alt={val.name}
                />
                <p style={{ fontSize: "15px", margin: "10px 0" }}>{val.desc}</p>
                <h3 style={{ margin: "5px 0" }}>{val.name}</h3>

                {/* Price with strikethrough */}
                <div style={{ marginTop: "5px" }}>
                  <p
                    style={{
                      textDecoration: "line-through", // Strike-through the old price
                      fontSize: "14px",
                      color: "gray",
                    }}
                  >
                    ₹{val.price}
                  </p>

                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px", // Bold and slightly larger for the new price
                    }}
                  >
                    ₹{discountedPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          style={{
            fontSize: "20px", // Smaller size for the arrow button
            padding: "5px",
            backgroundColor: "#ddd", // Background color for the button
            border: "none",
            cursor: "pointer", // Pointer cursor on hover
            zIndex: 10, // Make sure the button is on top
          }}
        >
          &#8594; {/* Right arrow */}
        </button>
      </div>
    </>
  );
};

export default BlockBusterDeals;
