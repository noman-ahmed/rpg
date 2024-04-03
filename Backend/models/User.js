const mongoose = require("mongoose");

// Define a schema for a counter collection to support auto-incrementing IDs
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const counterModel = mongoose.model("Counter", counterSchema);

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  // It seems you intend to add a userId field for auto-increment, but it's not defined here.
  // Assuming it should be a Number based on the counter logic.
  userId: { type: Number },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  starterPokemon: { type: String, required: true },
  team: { type: String, required: true },
  refreshToken: { type: String }, // Optional field for storing a refresh token
});

// Pre-save hook for auto-incrementing userId
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const doc = await counterModel.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.userId = doc.seq;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
