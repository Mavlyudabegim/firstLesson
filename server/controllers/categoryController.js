const categoryService = require('../services/categoryService');
async function category_details(req, res) {
  try {
    const category = await categoryService.getOneCategory(req.params.id);
    return res.json(category);
  } catch (error) {
    res.json(error);
  }
}
async function categories_details(req, res) {
  try {
    return res.status(200).json(await categoryService.getAllCategories());
  } catch (error) {
    res.json(error);
  }
}
async function category_create(req, res) {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    res.json(error);
  }
}
async function category_edit(req, res) {
  try {
    const new_category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    return res.json(new_category);
  } catch (error) {
    res.json(error);
  }
}
async function category_remove(req, res) {
  try {
    return res.json(await categoryService.deleteOneCategory(req.params.id));
  } catch (error) {
    res.json(error);
  }
}
module.exports = {
  categories_details,
  category_create,
  category_edit,
  category_remove,
  category_details,
};
