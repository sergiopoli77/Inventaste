const itemRepository = require("./item.repository");

const getItems = async () => {
  return await itemRepository.getAllItems();
};

const getItem = async (id) => {
  return await itemRepository.getItemById(id);
};

const addItem = async (itemData) => {
  return await itemRepository.createItem(itemData);
};

const modifyItem = async (id, itemData) => {
  return await itemRepository.updateItem(id, itemData);
};

const removeItem = async (id) => {
  return await itemRepository.deleteItem(id);
};

module.exports = {
  getItems,
  getItem,
  addItem,
  modifyItem,
  removeItem
};
