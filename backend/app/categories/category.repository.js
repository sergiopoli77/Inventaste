// Layer repository untuk komunikasi dengan database

const Category = require("./category.model");

// Mengambil semua kategori
const findAllCategories = async () => {
  const categories = await Category.find(); // Mengambil semua kategori
  return categories;
};

// Mengambil kategori berdasarkan ID
const findCategoryById = async (id) => {
  const category = await Category.findById(id); // Mengambil kategori berdasarkan ID
  return category;
};

// Menambahkan kategori baru
const createCategory = async (categoryData) => {
  const newCategory = new Category(categoryData);
  await newCategory.save(); // Menyimpan kategori baru ke database
  return newCategory;
};

// Mengupdate kategori berdasarkan ID
const updateCategory = async (id, categoryData) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
  return updatedCategory;
};

// Menghapus kategori berdasarkan ID
const deleteCategory = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  return deletedCategory;
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
