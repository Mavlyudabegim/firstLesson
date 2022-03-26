const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const accountController = require('../controllers/accountController');

// Read an account
router.get('/:accountId', accountController.account_details);
// Create an account
router.post('/:userId', jsonParser, accountController.account_create);
// Get all accounts
router.get('/:userId/user-accounts', accountController.accounts_details);
// Edit an account
router.put('/:accountId', jsonParser, accountController.account_edit);
// Delete an account
router.delete('/:accountId', accountController.account_delete);
// Get balance
// router.get('/:accountId/balance', accountController.getBalance);

module.exports = router;
