const express = require("express");
const router = express.Router();
const { login } = require("./auth.service");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await login(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
