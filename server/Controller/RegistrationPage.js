import express from "express";
import User from "../Schema/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserRotes = express.Router();

UserRotes.post("/signUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400).json("all field are required");
    }
    const existedUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existedUser) {
      res.status(409).json("user already existed");
    }
    const hasedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hasedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    if (savedUser) {
      const uerWithotPsaaword = await User.findById(savedUser._id).select(
        "-password"
      );
      res.status(200).json({
        message: "Successfully added",
        data: uerWithotPsaaword,
      });
    } else {
      res.status(500).json({
        message: "Failed to save user",
      });
    }
  } catch (error) {
    console.log("unable to make the req", error);
  }
});
UserRotes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password in the database
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.jwt, // Ensure you use the correct environment variable name
      { expiresIn: "1d" }
    );

    // Send token as a cookie and response
    res
      .status(200)
      .cookie("jwtToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ message: "Login successful", token }); // Return the token in the response
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

UserRotes.get("/refecth", async (req, res) => {
  const token = req.cookies.jwtToken;

  jwt.verify(token, process.env.jwt, async (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(data);
    }
  });
});

UserRotes.get("/logout", (req, res) => {
  try {
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true })
      .status(200)
      .send("sucessfully logout");
  } catch (err) {
    res.status(500).send("unable to logout", err);
  }
});

UserRotes.post("/resetPassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.status(404).json({ message: "user not found." });
    }

    const newPassword = await bcrypt.hash(password, 12);

    findUser.password = newPassword;

    await findUser.save();
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "Failed to reset password. Try again later." });
  }
});
