const itemRepository = require("./item.repository");

// Mengambil semua item
const getItems = async () => {
  return await itemRepository.getAllItems();  // Memanggil repository untuk mengambil semua item
};

// Mengambil item berdasarkan ID
const getItem = async (id) => {
  return await itemRepository.getItemById(id);  // Memanggil repository untuk mengambil item berdasarkan ID
};
// Mengambil item berdasarkan kategori
const getItemsByCategory = async (categoryId) => {
  return await itemRepository.getItemsByCategory(categoryId);
};

// Menambahkan item baru
const addItem = async (itemData) => {
  return await itemRepository.createItem(itemData);  // Memanggil repository untuk menambahkan item
};

// Mengupdate item berdasarkan ID
const modifyItem = async (id, itemData) => {
  return await itemRepository.updateItem(id, itemData);  // Memanggil repository untuk mengupdate item berdasarkan ID
};

// Menghapus item berdasarkan ID
const removeItem = async (id) => {
  return await itemRepository.deleteItem(id);  // Memanggil repository untuk menghapus item berdasarkan ID
};

module.exports = {
  getItems,
  getItem,
  getItemsByCategory,
  addItem,
  modifyItem,
  removeItem
};
