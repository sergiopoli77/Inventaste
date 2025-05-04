const Category = require("./category.model");

const findAllCategories = async () => {
  try {
    const categories = await Category.find(); // Mengambil semua kategori
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories from database: " + error.message);
  }
};

const findCategoryByName = async (name) => {
  try {
    const category = await Category.findOne({ name: new RegExp(name, 'i') }); // Case insensitive search
    return category;
  } catch (error) {
    throw new Error("Error finding category: " + error.message);
  }
};

module.exports = {
  findAllCategories, findCategoryByName
};
