const { findAllCategories } = require("./category.repository");

const getAllCategories = async () => {
  try {
    const categories = await findAllCategories();
    return categories;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

module.exports = {
  getAllCategories,
};
