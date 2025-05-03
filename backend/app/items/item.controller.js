const express = require("express");
const router = express.Router();
const itemService = require("./item.service");

// Endpoint untuk mendapatkan semua item
router.get("/items", async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.json({
      status: "success",
      message: "List of items",
      data: items,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk mendapatkan item berdasarkan ID
router.get("/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await itemService.getItemById(id);
    res.json({
      status: "success",
      message: "Item found",
      data: item,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk menambah item baru
router.post("/items", async (req, res) => {
  try {
    const itemData = req.body;
    const newItem = await itemService.addItem(itemData);
    res.status(201).json({
      status: "success",
      message: "Item created",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk mengupdate item
router.put("/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const itemData = req.body;
    const updatedItem = await itemService.updateItem(id, itemData);
    res.json({
      status: "success",
      message: "Item updated",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint untuk menghapus item
router.delete("/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await itemService.deleteItem(id);
    res.json({
      status: "success",
      message: "Item deleted",
      data: deletedItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
