const express = require("express");
const router = express.Router();
const { login } = require("./auth.service");
const jwt = require("jsonwebtoken");
const Employee = require("../employees/employee.model");

// Endpoint login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);
    res.json({
      status: "success",
      message: "Login berhasil",
      token: token,
    });
  } catch (error) {
    res.status(401).json({ status: "fail", message: error.message });
  }
});

// Auth middleware to verify token
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "fail", message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    
    // Add decoded user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};

// Get current user info endpoint
router.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await Employee.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    
    // Return user without sensitive data
    const userData = {
      _id: user._id,
      username: user.username,
      role: user.role,
      photoUrl: user.photoUrl
    };
    
    res.json({
      status: "success",
      message: "User information",
      data: userData
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

module.exports = router;

