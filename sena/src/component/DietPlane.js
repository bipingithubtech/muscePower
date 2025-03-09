import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../component/Diet.css";
import { Link } from "react-router-dom";

const DietPlane = ({ category }) => {
  const [diet, setDiet] = useState([]);
  const inputRef = useRef({});

  const generate = async () => {
    const selectedCategories = [];
    if (inputRef.current.veg?.checked) selectedCategories.push("veg");
    if (inputRef.current.non_veg?.checked) selectedCategories.push("non-veg");

    if (selectedCategories.length === 0) {
      alert("Please select at least one category (Veg or Non-Veg)");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/api/diet/categories?categories=${selectedCategories.join(
          ","
        )}&bmiCategory=${category}`
      );
      setDiet(res.data);
    } catch (error) {
      console.error("Error fetching diet plans:", error);
    }
  };

  const handleCheckboxChange = (selected) => {
    if (selected === "veg") {
      inputRef.current.non_veg.checked = false;
    } else if (selected === "non_veg") {
      inputRef.current.veg.checked = false;
    }
  };

  useEffect(() => {
    if (category) {
      generate();
    }
  }, [category]);

  return (
    <div className="diet-container">
      <h2>Make Your Meal According to the BMI Result</h2>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="veg"
            ref={(el) => (inputRef.current.veg = el)}
            onChange={() => handleCheckboxChange("veg")}
          />
          Veg
        </label>

        <label>
          <input
            type="checkbox"
            name="non_veg"
            ref={(el) => (inputRef.current.non_veg = el)}
            onChange={() => handleCheckboxChange("non_veg")}
          />
          Non-Veg
        </label>
      </div>

      <button className="generate-btn" onClick={generate}>
        Generate
      </button>

      <div className="diet-chart">
        {diet.length > 0 ? (
          diet.map((val, ind) => (
            <div className="diet-card" key={ind}>
              <div className="diet-info">
                <h3>{val.title}</h3>
                <p>
                  <strong>Protein:</strong> {val.protein}g
                </p>
                <p>
                  <strong>Carbs:</strong> {val.carbohydrates}g
                </p>
                <p>
                  <strong>Fat:</strong> {val.fat}g
                </p>
                <p>
                  <strong>Time:</strong> {val.time[0]}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-diet">No diet available</div>
        )}
      </div>

      <div className="diet-footer">
        <h3>Follow this diet plan consistently and see the results!</h3>
        <p>
          For even better and faster results, try our premium health products.
          They are designed to complement your diet and help you achieve your
          fitness goals effectively.
        </p>
        <Link to={"/product"}>
          <button className="product-btn">Explore Our Products</button>
        </Link>
      </div>
    </div>
  );
};

export default DietPlane;
