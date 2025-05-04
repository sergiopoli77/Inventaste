// inventoryTransaction.model.js
const mongoose = require("mongoose");

// Schema untuk Inventory Transaction
const inventoryTransactionSchema = mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Referensi ke koleksi Item
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Referensi ke koleksi Employee (Creator)
      required: true,
    },
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Referensi ke koleksi Employee (Updater)
    },
  },
  {
    versionKey: false,  // Tidak menambahkan __v ke setiap dokumen
    timestamps: true,   // Menambahkan createdAt dan updatedAt
  }
);

// Model untuk Inventory Transaction
const InventoryTransaction = mongoose.model("InventoryTransaction", inventoryTransactionSchema);

module.exports = InventoryTransaction;
