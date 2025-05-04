const express = require("express");
const router = express.Router();
const { login } = require("./auth.service");

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

module.exports = router;
