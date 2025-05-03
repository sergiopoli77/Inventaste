const express = require("express");
const itemService = require("./item.service");

const router = express.Router();

// GET /items - Mengambil semua item
router.get("/items", async (req, res) => {
  try {
    const items = await itemService.getItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /items/:id - Mengambil item berdasarkan ID
router.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemService.getItem(id);
    if (!item) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /items - Menambahkan item baru
router.post("/items", async (req, res) => {
  const { name, stock, status, id_kategori, createdBy, updateBy } = req.body;
  try {
    const newItem = await itemService.addItem({
      name,
      stock,
      status,
      id_kategori,
      createdBy,
      updateBy
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /items/:id - Mengupdate item berdasarkan ID
router.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, stock, status, id_kategori, updateBy } = req.body;
  try {
    const updatedItem = await itemService.modifyItem(id, {
      name,
      stock,
      status,
      id_kategori,
      updateBy
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /items/:id - Menghapus item berdasarkan ID
router.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await itemService.removeItem(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(200).json({ message: "Item berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
