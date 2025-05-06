const express = require("express");
const router = express.Router();
const itemService = require("./item.service");
const { isAdmin, isAuthenticated } = require("../middleware/authRoles");
const jwt = require("jsonwebtoken");

// Auth middleware to verify token 
// (this is moved from auth.controller.js to be used here)
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

// GET semua item - Accessible to both admin and staff
router.get("/items", authMiddleware, isAuthenticated, async (req, res) => {
  try {
    const items = await itemService.getItems();
    res.json({
      status: "success",
      message: "List of items",
      data: items,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET item by ID - Accessible to both admin and staff
router.get("/items/:id", authMiddleware, isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    const item = await itemService.getItem(id);

    if (!item) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.json({
      status: "success",
      message: "Item data",
      data: item,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET item by category - Accessible to both admin and staff
router.get("/items/category/:categoryId", authMiddleware, isAuthenticated, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const items = await itemService.getItemsByCategory(categoryId);

    res.json({
      status: "success",
      message: "List of items by category",
      data: items,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST item baru - Admin only
router.post("/items", authMiddleware, isAdmin, async (req, res) => {
  const { name, stock, status, id_kategori, notes } = req.body;
  try {
    // Set createdBy and updateBy to the current user's ID
    const newItem = await itemService.addItem({
      name,
      stock,
      status,
      id_kategori,
      notes,
      createdBy: req.user.id,
      updateBy: req.user.id,
    });

    res.status(201).json({
      status: "success",
      message: "Item berhasil ditambahkan",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update item - Admin only
router.put("/items/:id", authMiddleware, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, stock, status, id_kategori, notes } = req.body;
  try {
    const updatedItem = await itemService.modifyItem(id, {
      name,
      stock,
      status,
      id_kategori,
      notes,
      updateBy: req.user.id, // Set updateBy to current user's ID
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.json({
      status: "success",
      message: "Item berhasil diupdate",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE item - Admin only
router.delete("/items/:id", authMiddleware, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await itemService.removeItem(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    res.json({
      status: "success",
      message: "Item berhasil dihapus",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;