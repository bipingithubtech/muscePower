import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

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
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching diet plans:", error);
    }
  };
  const handleCheckboxChange = (select) => {
    if (select === "veg") {
      inputRef.current.non_veg.checked = false;
    } else if (select === "veg") {
      inputRef.current.veg.checked = false;
    }
  };

  useEffect(() => {
    if (category) {
      generate();
    }
  }, []);

  return (
    <div>
      <h2>Make your meal according to the BMI result</h2>

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

      <button onClick={generate}>Generate</button>
    </div>
  );
};

export default DietPlane;
