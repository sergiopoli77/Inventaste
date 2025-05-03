const Item = require("./item.model");

const getAllItems = async () => {
  return await Item.find().populate('id_kategori createdBy updateBy');
};

const getItemById = async (id) => {
  return await Item.findById(id).populate('id_kategori createdBy updateBy');
};

const createItem = async (itemData) => {
  const newItem = new Item(itemData);
  return await newItem.save();
};

const updateItem = async (id, itemData) => {
  return await Item.findByIdAndUpdate(id, itemData, { new: true });
};

const deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
