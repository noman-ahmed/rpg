// utils/authHelpers.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error; // Rethrow the error for handling upstream
  }
};

const validateRefreshToken = (user, refreshToken) => {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // Check if the decoded userID matches the user's ID and the token matches
    return decoded.userId === user.id && user.refreshToken === refreshToken;
  } catch (error) {
    console.error("Error validating refresh token:", error);
    return false; // If there's an error (e.g., token is expired), return false
  }
};

module.exports = { findUserById, validateRefreshToken };
