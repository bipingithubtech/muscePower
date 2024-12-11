import React, { useState } from "react";
import "../RegistrationPage/Recover.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RecoverPassword = () => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For error message
  const navigate = useNavigate();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match."); // Set error if passwords don't match
        return;
      }
      setError(""); // Clear error if passwords match
      const res = await axios.post(
        "http://localhost:8000/api/register/resetPassword",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("You successfully changed your password");
      navigate("/register-login");
    } catch {
      toast.error("Error while saving password");
    }
  };

  return (
    <div className="recover-overlay">
      <div className="recover-container">
        <div className="recover-form-wrapper">
          <Link to="/">
            <button className="recover-close-button">&times;</button>
          </Link>
          <h2 className="recover-heading">Reset Your Password</h2>
          <p className="recover-description">
            Enter your email and a new password to regain access to your
            account.
          </p>
          <form className="recover-form" onSubmit={submitForm}>
            {/* Email Field */}
            <div className="recover-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmial(e.target.value)}
              />
            </div>
            {/* New Password Field */}
            <div className="recover-form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                name="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Confirm New Password Field */}
            <div className="recover-form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              {error && <p className="error-message">{error}</p>}{" "}
              {/* Show error above input */}
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm your new password"
                name="confirmNewPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="recover-submit-button">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecoverPassword;
