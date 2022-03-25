const Category = require('../models/category');
async function getOneCategory(categoryId) {
  const category = await Category.findById(categoryId);
  return category;
}
async function getAllCategories() {
  const categories = await Category.find();
  return categories;
}
async function createCategory(category) {
  const new_category = await Category.create(category);
  return new_category;
}
async function updateCategory(categoryId, updatedCategory) {
  const updated_category = await Category.findByIdAndUpdate(
    categoryId,
    updatedCategory
  );
  return updated_category;
}
async function deleteOneCategory(categoryId) {
  const deleted_category = await Category.findByIdAndDelete(categoryId);
  return deleted_category;
}
module.exports = {
  getOneCategory,
  createCategory,
  updateCategory,
  deleteOneCategory,
  getAllCategories,
};
