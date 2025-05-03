// Layer service untuk menangani logika bisnis terkait kategori

const { findAllCategories, findCategoryById, createCategory, updateCategory, deleteCategory } = require("./category.repository");

const getAllCategories = async () => {
  const categories = await findAllCategories();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await findCategoryById(id);
  if (!category) {
    throw Error("Kategori tidak ditemukan");
  }
  return category;
};

const addCategory = async (categoryData) => {
  const newCategory = await createCategory(categoryData);
  return newCategory;
};

const modifyCategory = async (id, categoryData) => {
  const updatedCategory = await updateCategory(id, categoryData);
  if (!updatedCategory) {
    throw Error("Kategori gagal diupdate atau tidak ditemukan");
  }
  return updatedCategory;
};

const removeCategory = async (id) => {
  const deletedCategory = await deleteCategory(id);
  if (!deletedCategory) {
    throw Error("Kategori gagal dihapus atau tidak ditemukan");
  }
  return deletedCategory;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  modifyCategory,
  removeCategory,
};
