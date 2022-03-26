const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const piggybankController = require('../controllers/piggybankController');
// get one piggybank
router.get('/:piggybankId', piggybankController.piggybank_details);
// create new piggybank
router.post('/:accountId', jsonParser, piggybankController.piggybank_create);
// get all piggybanks
router.get(
  '/:accountId/account-piggybanks',
  jsonParser,
  piggybankController.piggybanks_details
);
// update one piggybank
router.put('/:piggybankId', jsonParser, piggybankController.piggybank_edit);
// delete one piggybank
router.delete('/:piggybankId', piggybankController.piggybank_remove);
// add money
router.get(
  '/:piggybankId/money-adding',
  piggybankController.piggybank_add_money
);
module.exports = router;
