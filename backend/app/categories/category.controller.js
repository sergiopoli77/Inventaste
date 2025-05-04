// Controller untuk handle request dan response
const express = require("express");
const router = express.Router();
const { getCategoryById, getAllCategories, createCategory, updateCategory, deleteCategory } = require("./category.service");

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

// GET kategori by ID
router.get("/categories/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getCategoryById(id);

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

// POST kategori baru
router.post("/categories", async (req, res) => {
  const { id_kategori, name, description } = req.body;
  try {
    const newCategory = await createCategory({ id_kategori, name, description });
    res.status(201).json({
      status: "success",
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT untuk update kategori
router.put("/categories/:id", async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedCategory = await updateCategory(req.params.id, { name, description });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE kategori
router.delete("/categories/:id", async (req, res) => {
  try {
    const deletedCategory = await deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
