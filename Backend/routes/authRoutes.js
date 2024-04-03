const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserSession = require("../models/userSession");
const verifyToken = require("../middleware/verifyToken");
const { findUserById, validateRefreshToken } = require("../utils/authHelpers");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      starterPokemon: req.body.starterPokemon,
      team: req.body.team,
    });
    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // If user not found or password does not match
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Respond with tokens and user information
    res.send({
      username: user.username,
      accessToken,
      refreshToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .send({ message: "An error occurred during the login process." });
  }
});

// Refresh Token Endpoint
router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: "Invalid refresh token" });
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
    // Select the fields to return, excluding the password for security
    const userInfo = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      starterPokemon: user.starterPokemon,
      team: user.team,
    };
    res.json(userInfo);
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send({ message: "Failed to retrieve user information" });
  }
});

// Get user ID from UserSession
router.get("/userid", verifyToken, async (req, res) => {
  try {
    const userSession = await UserSession.findOne({
      token: req.headers.authorization.split(" ")[1],
    });
    if (!userSession) {
      return res.status(404).send({ message: "User session not found" });
    }
    res.json({ userId: userSession.userId });
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    res.status(500).send({ message: "Failed to retrieve user ID" });
  }
});

// Endpoint to explicitly create or update the user session
router.post("/updateUserSession", async (req, res) => {
  const { userId, lastSessionDate, accessToken } = req.body; // Change token to accessToken
  try {
    // Create a new UserSession document
    const newSession = await UserSession.create({
      userId, // Ensure this is a valid ObjectId
      lastSessionDate: new Date(lastSessionDate),
      accessToken, // Update to use accessToken
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
