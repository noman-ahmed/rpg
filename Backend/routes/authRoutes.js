const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Your User model
const UserSession = require("../models/userSession"); // Your UserSession model
const verifyToken = require("../middleware/verifyToken"); // Your auth middleware

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send(error);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // Create a new UserSession document upon successful login
    const newSession = await UserSession.create({
      userId: user._id,
      lastSessionDate: new Date(),
      token,
    });

    res.send({ token, message: "Login successful", sessionId: newSession._id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error);
  }
});

// Get user information (example endpoint using async/await and verifyToken middleware)
router.get("/userinfo", verifyToken, async (req, res) => {
  try {
    // Assuming req.user is set to the user ID by verifyToken middleware
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json({ username: user.username });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send({ message: "Failed to retrieve user information" });
  }
});

// Endpoint to explicitly create or update the user session
router.post("/updateUserSession", async (req, res) => {
  const { userId, lastSessionDate, token } = req.body;
  try {
    // Create a new UserSession document
    const newSession = await UserSession.create({
      userId, // Ensure this is a valid ObjectId
      lastSessionDate: new Date(lastSessionDate),
      token,
    });

    res.send({
      message: "User session created successfully",
      session: newSession,
    });
  } catch (error) {
    console.error("Error creating user session:", error);
    res
      .status(500)
      .send({ message: "Error creating user session", error: error.message });
  }
});

module.exports = router;
