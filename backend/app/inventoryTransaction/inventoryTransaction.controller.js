// inventoryTransaction.controller.js
const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} = require("./inventoryTransaction.service");

// POST untuk menambahkan transaksi
router.post("/inventory-transactions", async (req, res) => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json({
      status: "success",
      message: "Transaction created",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET untuk mengambil semua transaksi
router.get("/inventory-transactions", async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.json({
      status: "success",
      message: "List of transactions",
      data: transactions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET untuk mengambil transaksi berdasarkan ID
router.get("/inventory-transactions/:id", async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    res.json({
      status: "success",
      message: "Transaction data",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
