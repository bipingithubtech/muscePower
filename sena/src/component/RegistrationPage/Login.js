import React, { useState } from "react";
import "../RegistrationPage/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Corrected the import statement here
import { useUser } from "../storage/Context";

const Login = () => {
  const { token, setToken } = useUser(null);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Added error state for displaying error messages
  const navigate = useNavigate();

  const setlogin = (e) => {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await axios.post(
        "http://localhost:8000/api/register/login",
        value,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // On successful login, redirect to the home page
      console.log(res.data, "loginsucessfull");
      setToken(res.data);
      navigate("/"); // Navigate to home page after login
    } catch (err) {
      console.error(
        "Error while sending post request to backend:",
        err.response ? err.response.data : err.message
      );
      // Update error state to display the error message
      setError(
        err.response
          ? err.response.data.message
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="overlay">
      <div className="login-container">
        {/* Left Section */}
        <div className="left-login">
          <img
            src="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Welcome"
            className="login-image"
          />
        </div>

        {/* Right Section */}
        <div className="right-login">
          <Link to="/">
            <button className="close-button">&times;</button>
          </Link>
          <h1>Welcome Back!</h1>
          <form className="login-form" onSubmit={onLogin}>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={value.email}
                onChange={setlogin}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={value.password}
                onChange={setlogin}
              />
            </div>

            {/* Error Message Display */}
            {error && <div className="error-message">{error}</div>}

            <button className="login-button">Login</button>
            <p>
              <a href="/otp"> forgot password</a>
            </p>
            <p>
              Don’t have an account? <a href="/register">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
