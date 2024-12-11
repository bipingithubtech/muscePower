import React, { useState } from "react";
import "../RegistrationPage/opt.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false); // Toggle OTP input form
  const [loading, setLoading] = useState(false);
  const sendOtp = async () => {
    setLoading(true);
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/verification/sendOtp",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoading(false);
      setShowOtpInput(true);
      toast.success("OTP sent to your email.");
      console.log(res.data, "sended the otp");
    } catch (err) {
      console.error(
        "Error while sending post request to backend:",
        err.response ? err.response.data : err.message
      );
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/verification/otpauth",
        { email, otp },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(
        "OTP verified successfully. You can now reset your password."
      );
      navigate("/recover-password");
      setLoading(false);
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response ? error.response.data : error.message
      );
      toast.error("Invalid OTP. Please try again.");

      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="form-container">
        <div className="email-form">
          <h2>Enter Your Email</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
        {showOtpInput && (
          <div className="otp-form">
            <h2>Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}{" "}
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpPage;
