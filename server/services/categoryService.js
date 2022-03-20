const Category = require('../models/category');
async function getOneCategory(id) {
  const category = await Category.findById(id);
  return category;
}
async function getAllCategories(userId) {
  const categories = await Category.find({ userId });
  return categories;
}
async function createCategory(userId, category) {
  const new_category = await Category.create({ ...category, userId });
  return new_category;
}
async function updateCategory(id, updatedCategory) {
  const updated_category = await Category.findByIdAndUpdate(
    id,
    updatedCategory
  );
  return updated_category;
}
async function deleteOneCategory(id) {
  const deleted_category = await Category.findByIdAndDelete(id);
  return deleted_category;
}
module.exports = {
  getOneCategory,
  createCategory,
  updateCategory,
  deleteOneCategory,
  getAllCategories,
};
