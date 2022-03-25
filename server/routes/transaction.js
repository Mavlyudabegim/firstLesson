const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const transactionController = require('../controllers/transactionController');
// get one transaction
router.get('/:transactionId', transactionController.transaction_details);
// create new transaction
router.post(
  '/:accountId/:categoryId',
  jsonParser,
  transactionController.transaction_create
);
// get all transactions
router.get(
  '/:accountId/account-transactions',
  jsonParser,
  transactionController.transactions_details
);
// update one transaction
router.put(
  '/:transactionId',
  jsonParser,
  transactionController.transaction_edit
);
// delete one transaction
router.delete('/:transactionId', transactionController.transaction_remove);

module.exports = router;
