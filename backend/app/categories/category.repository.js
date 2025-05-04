const Category = require("./category.model");

const findAllCategories = async () => {
  try {
    const categories = await Category.find(); // Mengambil semua kategori
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories from database: " + error.message);
  }
};

module.exports = {
  findAllCategories,
};
