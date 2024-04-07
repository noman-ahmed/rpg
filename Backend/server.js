// server.js
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "../.env.prod" });
} else {
  require("dotenv").config({ path: "../.env.local" });
}

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes"); // Adjust the path as necessary
const verifyToken = require("./middleware/verifyToken");

const app = express();

// Basic security enhancements
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);

app.use(express.json());

// Assuming 'app' is your Express.js application

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Authentication routes
    app.use("/api", authRoutes);

    // Protected route example
    app.get("/api/protected", verifyToken, (req, res) => {
      res.send("Welcome to the protected route!");
    });

    const port = process.env.PORT || 3001; // Using PORT from .env, with a fallback
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
