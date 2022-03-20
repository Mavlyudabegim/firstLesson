const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const expensesController = require('../controllers/expensesController');
const jsonParser = bodyParser.json();
// Read expense
router.get('/:id', expensesController.expense_details);
// Read all expenses
router.get('/:accountId', expensesController.expenses_details);
// Create expense
router.post('/:accountId', jsonParser, expensesController.expenses_create);
// Edit expense
router.put('/:id', jsonParser, expensesController.expenses_edit);
// Delete expense
router.delete('/:id', expensesController.expenses_remove);

module.exports = router;
