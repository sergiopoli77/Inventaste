const mongoose = require("mongoose");

// Schema untuk Item
const itemSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    stock: { 
      type: Number, 
      required: true, 
      default: 0 
    },
    status: { 
      type: String, 
      enum: ["aktif", "low-stock", "non-aktif"], // Added low-stock status
      default: "aktif" 
    },
    notes: {
      type: String,
      required: false
    },
    id_kategori: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Employee", 
      required: true 
    },
    updateBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Employee" 
    }
  },
  {
    versionKey: false,  // Menghapus __v dari schema
    timestamps: true  // Menambahkan createdAt dan updatedAt
  }
);

// Model untuk Item
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;