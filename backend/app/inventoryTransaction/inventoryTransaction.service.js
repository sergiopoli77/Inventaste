// inventoryTransaction.service.js
const {
    createTransaction: createTransactionInRepo,
    getAllTransactions: getAllTransactionsFromRepo,
    getTransactionById: getTransactionByIdFromRepo,
  } = require("./inventoryTransaction.repository");
  
  // Fungsi untuk menambahkan transaksi baru
  const createTransaction = async (data) => {
    const transaction = await createTransactionInRepo(data);
    return transaction;
  };
  
  // Fungsi untuk mengambil semua transaksi
  const getAllTransactions = async () => {
    const transactions = await getAllTransactionsFromRepo();
    return transactions;
  };
  
  // Fungsi untuk mengambil transaksi berdasarkan ID
  const getTransactionById = async (id) => {
    const transaction = await getTransactionByIdFromRepo(id);
    if (!transaction) {
      throw Error("Transaction not found");
    }
    return transaction;
  };
  
  module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
  };
  