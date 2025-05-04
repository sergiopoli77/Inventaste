const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // menyimpan info user di req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }
};

module.exports = authMiddleware;
