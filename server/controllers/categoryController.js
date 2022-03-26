const categoryService = require('../services/categoryService');
async function category_details(req, res, next) {
  try {
    const category = await categoryService.getOneCategory(
      req.params.categoryId
    );
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}
async function categories_details(req, res, next) {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}
async function category_create(req, res, next) {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}
async function category_edit(req, res, next) {
  try {
    const new_category = await categoryService.updateCategory(
      req.params.categoryId,
      req.body
    );
    return res.status(200).json(new_category);
  } catch (error) {
    next(error);
  }
}
async function category_remove(req, res, next) {
  try {
    const deleted_category = await categoryService.deleteOneCategory(
      req.params.categoryId
    );
    return res.status(204).json(deleted_category);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  categories_details,
  category_create,
  category_edit,
  category_remove,
  category_details,
};
