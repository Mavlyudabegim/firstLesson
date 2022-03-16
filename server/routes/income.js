const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const incomeController = require('../controllers/incomeController');
// Read income
router.get('/:id', incomeController.income_details);
// Create income
router.post('/new-income', jsonParser, incomeController.income_create);
// Get all income
router.get('/', incomeController.incomes_details);
// Edit income
router.put('/:id', jsonParser, incomeController.income_edit);
// Delete an income
router.delete('/:id', incomeController.income_remove);

module.exports = router;
