// inventoryTransaction.repository.js
const InventoryTransaction = require("./inventoryTransaction.model");

// Fungsi untuk menambahkan transaksi baru
const createTransaction = async (data) => {
  const transaction = new InventoryTransaction(data);
  await transaction.save();
  return transaction;
};

// Fungsi untuk mengambil semua transaksi
const getAllTransactions = async () => {
  return InventoryTransaction.find()
    .populate("itemId")  // Populate data item
    .populate("createdBy", "username")  // Populate username createdBy
    .populate("updateBy", "username"); // Populate username updateBy
};

// Fungsi untuk mengambil transaksi berdasarkan ID
const getTransactionById = async (id) => {
  return InventoryTransaction.findById(id)
    .populate("itemId")
    .populate("createdBy", "username")
    .populate("updateBy", "username");
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
};
