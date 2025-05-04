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

// GET category by name
router.get("/categories/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const category = await getCategoryByName(name);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      status: "success",
      message: "Category data",
      data: category,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
