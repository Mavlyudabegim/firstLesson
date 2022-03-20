const categoryService = require('../services/categoryService');
async function category_details(req, res) {
  try {
    const category = await categoryService.getOneCategory(req.params.id);
    return res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function categories_details(req, res) {
  try {
    const categories = await categoryService.getAllCategories(req.userId);
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function category_create(req, res) {
  try {
    const category = await categoryService.createCategory(req.userId, req.body);
    return res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function category_edit(req, res) {
  try {
    const new_category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    return res.status(200).json(new_category);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function category_remove(req, res) {
  try {
    const deleted_category = await categoryService.deleteOneCategory(
      req.params.id
    );
    return res.status(204).json(deleted_category);
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = {
  categories_details,
  category_create,
  category_edit,
  category_remove,
  category_details,
};
