import React, { useState } from "react";
import "../RegistrationPage/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../storage/Context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { token, setToken } = useUser(null);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const setlogin = (e) => {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/register/login",
        value,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data, "loginsucessfull");
      setToken(res.data);
      navigate("/");
    } catch (err) {
      console.error(
        "Error while sending post request to backend:",
        err.response ? err.response.data : err.message
      );

      setError(
        err.response
          ? err.response.data.message
          : "Login failed. Please try again."
      );
    }
  };
  const toggle = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="overlay">
      <div className="login-container">
        <div className="left-login">
          <img
            src="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Welcome"
            className="login-image"
          />
        </div>

        <div className="right-login">
          <Link to="/">
            <button className="close-button">x</button>
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
              <div class="mb-4 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={value.password}
                  onChange={setlogin}
                />
                <span onClick={toggle}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

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
