const express = require("express");
const router = express.Router();
const { getAllCategories } = require("./category.service");

// GET semua kategori
router.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json({
      status: "success",
      message: "List of categories",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
