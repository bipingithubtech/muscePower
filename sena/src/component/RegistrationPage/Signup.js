import React, { useState } from "react";
import "../RegistrationPage/register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [value, setValue] = useState([
    {
      name: " ",
      email: " ",
      password: " ",
    },
  ]);

  const navigate = useNavigate();

  const onsetvalue = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/register/signUp",
        value,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      setValue({
        name: "",
        email: "",
        password: "",
      });
      navigate("/register-login");
    } catch (err) {
      console.error(
        "Error while sending post request to backend:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="overlay">
      <div className="signup-container">
        {/* Left Section */}
        <div className="left-register">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Welcome"
            className="signup-image"
          />
        </div>

        <div className="right-register">
          {/* Close Button */}
          <Link to="/">
            <button className="close-button">&times;</button>
          </Link>
          <h1>Welcome to MB!</h1>
          <form className="signup-form" onSubmit={formSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name please!!!"
                name="name"
                onChange={onsetvalue}
                value={value.name}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={onsetvalue}
                value={value.email}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={onsetvalue}
                value={value.password}
              />
            </div>
            <button className="signup-button">Sign Up</button>
            <p>
              Already have an account? <a href="/register-login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
