const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const categoryController = require('../controllers/categoryController');
const jsonParser = bodyParser.json();
// Read expense
router.get('/:categoryId', categoryController.category_details);
// Read all expenses
router.get('/', categoryController.categories_details);
// Create expense
router.post('/', jsonParser, categoryController.category_create);
// Edit expense
router.put('/:categoryId', jsonParser, categoryController.category_edit);
// Delete expense
router.delete('/:categoryId', categoryController.category_remove);

module.exports = router;
