const express = require("express");
const router = express.Router();
const itemService = require("./item.service");

// GET semua item
router.get("/items", async (req, res) => {
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

// GET item by ID
router.get("/items/:id", async (req, res) => {
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

// POST item baru
router.post("/items", async (req, res) => {
  const { name, stock, status, id_kategori, createdBy, updateBy } = req.body;
  try {
    const newItem = await itemService.addItem({
      name,
      stock,
      status,
      id_kategori,
      createdBy,
      updateBy,
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

// PUT update item
router.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, stock, status, id_kategori, updateBy } = req.body;
  try {
    const updatedItem = await itemService.modifyItem(id, {
      name,
      stock,
      status,
      id_kategori,
      updateBy,
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

// DELETE item
router.delete("/items/:id", async (req, res) => {
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
