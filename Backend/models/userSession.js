const mongoose = require("mongoose");
const User = require("./User"); // Adjust the path as necessary to import your User model

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Defines a reference to User
      required: true,
      ref: "User", // This must match the name given to your User model
    },
    lastSessionDate: {
      type: Date,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Including timestamps adds createdAt and updatedAt fields automatically

const UserSession = mongoose.model(
  "UserSession",
  userSessionSchema,
  "test.userSession"
);

module.exports = UserSession;
