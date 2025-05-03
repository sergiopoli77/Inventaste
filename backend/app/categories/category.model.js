const mongoose = require("mongoose");

// Membuat Schema untuk Category
const categorySchema = mongoose.Schema(
  {
    id_kategori: {
      type: String,
      required: true,
      unique: true, // Pastikan id_kategori unik
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, // Tidak menambahkan __v ke setiap dokumen
    timestamps: true, // Menambahkan createdAt dan updatedAt
  }
);

// Membuat Model untuk Category
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
