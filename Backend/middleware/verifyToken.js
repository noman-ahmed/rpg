const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Updated to use process.env.JWT_SECRET
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
