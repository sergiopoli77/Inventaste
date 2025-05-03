const itemRepository = require("./item.repository");

// Fungsi untuk mendapatkan semua item
const getAllItems = async () => {
  return await itemRepository.findAll();
};

// Fungsi untuk mendapatkan item berdasarkan ID
const getItemById = async (id) => {
  const item = await itemRepository.findById(id);
  if (!item) {
    throw new Error("Item tidak ditemukan");
  }
  return item;
};

// Fungsi untuk menambah item baru
const addItem = async (itemData) => {
  return await itemRepository.create(itemData);
};

// Fungsi untuk mengupdate item
const updateItem = async (id, itemData) => {
  const item = await itemRepository.updateById(id, itemData);
  if (!item) {
    throw new Error("Item tidak ditemukan");
  }
  return item;
};

// Fungsi untuk menghapus item
const deleteItem = async (id) => {
  const item = await itemRepository.deleteById(id);
  if (!item) {
    throw new Error("Item tidak ditemukan");
  }
  return item;
};

module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
