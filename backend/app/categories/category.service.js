const { findAllCategories, findCategoryByName } = require("./category.repository");
const getAllCategories = async () => {
  try {
    const categories = await findAllCategories();
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

const getCategoryByName = async (name) => {
  try {
    const category = await findCategoryByName(name);
    return category;
  } catch (error) {
    throw new Error("Error finding category: " + error.message);
  }
};

module.exports = {
  getAllCategories, getCategoryByName
};
