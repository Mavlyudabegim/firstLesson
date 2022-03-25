const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const subscriptionController = require('../controllers/subscriptionController');
// get one subscription
router.get('/:subscriptionId', subscriptionController.subscription_details);
// create new subscription
router.post(
  '/:accountId/:categoryId',
  jsonParser,
  subscriptionController.subscription_create
);
// get all subscriptions
router.get(
  '/:accountId/account-subscriptions',
  jsonParser,
  subscriptionController.subscriptions_details
);
// update one subscription
router.put(
  '/:subscriptionId',
  jsonParser,
  subscriptionController.subscription_edit
);
// delete one subscription
router.delete('/:subscriptionId', subscriptionController.subscription_remove);
// take monthly subscription charge
router.get(
  '/:subscriptionId/account-balance',
  subscriptionController.monthly_payment
);
module.exports = router;
