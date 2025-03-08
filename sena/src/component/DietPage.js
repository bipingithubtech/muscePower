import React from "react";
import "../component/Diet.css";
import { useState } from "react";
import { useRef } from "react";
import DietPlane from "./DietPlane";

const DietPage = () => {
  const [bmi, setBmi] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [category, setCategory] = useState("");

  const inputRefs = useRef({});

  const calculateBMI = (e) => {
    e.preventDefault();
    const age = inputRefs.current.age?.value;
    const height = parseFloat(inputRefs.current.height?.value) / 100;
    const weight = parseFloat(inputRefs.current.weight?.value);
    if (!height || !weight) {
      alert("Please enter valid height and weight");
      return;
    }
    const bmiVlaue = (weight / (height * height)).toFixed(1);
    setBmi(bmiVlaue);
    let newrotaion = 0;
    if (bmiVlaue < 18.5) {
      setCategory("underweight");
      newrotaion = -60;
    } else if (bmiVlaue >= 18.5 && bmiVlaue < 24.9) {
      setCategory("normal");
      newrotaion = 0;
    } else if (bmiVlaue >= 25 && bmiVlaue < 29.9) {
      setCategory("overweight");
      newrotaion = 30;
    } else {
      setCategory("obese");

      newrotaion = 60;
    }
    setRotation(newrotaion);
  };

  return (
    <div className="maindiv">
      <div className="header">
        <h1>BMI Calculator & Healthy Weight Plan</h1>
        <p>
          Body mass index (BMI) estimates how healthy your weight is based on
          your height. There's no "perfect weight" that fits everyone, but BMI
          can help most adults understand their weight-related health risks. BMI
          is calculated for both men and women by dividing weight in kilograms
          by height in meters squared.
        </p>
      </div>
      <div className="Bmi">
        <div className="bmicalcultor">
          <form onSubmit={calculateBMI}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Age</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Age"
                      name="age"
                      ref={(el) => (inputRefs.current.age = el)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Gender</label>
                  </td>
                  <td>
                    <input type="checkbox" id="male" />
                    <label htmlFor="male">Male</label>
                    <input type="checkbox" id="female" />
                    <label htmlFor="female">Female</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Height (cm)</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Height"
                      name="height"
                      ref={(el) => (inputRefs.current.height = el)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Weight (kg)</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Weight"
                      name="weight"
                      ref={(el) => (inputRefs.current.weight = el)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="button-row">
                    <button type="submit" className="calculate">
                      Calculate
                    </button>
                    <button type="reset" className="clear">
                      Clear
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="result">
          <div className="gauge-container">
            <div className="gauge">
              <div
                className="needle"
                style={{ transform: `rotate(${rotation}deg)` }}
              ></div>
            </div>
          </div>

          <div className="category-labels">
            <span className="underweight">Underweight</span>
            <span className="normal">Normal</span>
            <span className="overweight">Overweight</span>
            <span className="obese">Obese</span>
          </div>

          <p>{bmi ? `BMI: ${bmi} - ${category}` : "Enter details"}</p>
        </div>
      </div>
      <div className="dietPlanDive">
        <DietPlane category={category} />
      </div>
    </div>
  );
};

export default DietPage;
