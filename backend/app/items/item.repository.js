const Item = require("./item.model");

// Fungsi untuk mengambil semua item
const findAll = async () => {
  return await Item.find();
};

// Fungsi untuk mencari item berdasarkan ID
const findById = async (id) => {
  return await Item.findById(id);
};

// Fungsi untuk menambah item baru
const create = async (itemData) => {
  const item = new Item(itemData);
  return await item.save();
};

// Fungsi untuk mengupdate item berdasarkan ID
const updateById = async (id, itemData) => {
  return await Item.findByIdAndUpdate(id, itemData, { new: true });
};

// Fungsi untuk menghapus item berdasarkan ID
const deleteById = async (id) => {
  return await Item.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
