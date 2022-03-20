const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const accountController = require('../controllers/accountController');

// Read an account
router.get('/:id', accountController.account_details);
// Create an account
router.post('/', jsonParser, accountController.account_create);
// Get all accounts
router.get('/', accountController.accounts_details);
// Edit an account
router.put('/:id', jsonParser, accountController.account_edit);
// Delete an account
router.delete('/:id', accountController.account_delete);
// Get income sum
router.get('/:id/incomes-sum', accountController.getIncomeSum);
// Get expense sum
router.get('/:id/expenses-sum', accountController.getExpenseSum);
module.exports = router;
