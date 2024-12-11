import express from "express";
import mailSender from "../utility/MailSender.js";
import crypto from "crypto";
import { body, validationResult } from "express-validator";
import Otp from "../Schema/OptModel.js";
import User from "../Schema/User.js";

export const OtpRouter = express.Router();

OtpRouter.post("/sendOtp", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const otp = crypto.randomInt(1000, 9999).toString();
  await Otp.deleteOne({ email });

  const otpRocord = new Otp({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });
  try {
    await otpRocord.save();
    await mailSender(
      email,
      "Password Recovery OTP",
      `Your OTP for password recovery is: ${otp}`
    );
    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP. Try again later." });
  }
});

// verfy otp

OtpRouter.post("/otpauth", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found for this email." });
    }
    // expiration
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: "OTP has expired." });
    }
    if (otpRecord.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    await Otp.deleteOne({ email });

    res.status(200).json({
      message: "OTP verified successfully. You can now reset your password.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP. Try again later." });
  }
});

//
