const piggybankService = require('../services/piggybankService');
async function piggybank_details(req, res, next) {
  try {
    const piggybankVal = await piggybankService.getOnePiggybank(
      req.params.piggybankId
    );
    return res.status(200).json(piggybankVal);
  } catch (error) {
    next(error);
  }
}
async function piggybank_create(req, res, next) {
  try {
    const new_piggybank = await piggybankService.createPiggybank(
      req.params.accountId,
      req.body
    );
    return res.status(201).json(new_piggybank);
  } catch (error) {
    next(error);
  }
}
async function piggybank_edit(req, res, next) {
  try {
    const new_piggybank = await piggybankService.updatePiggybank(
      req.params.piggybankId,
      req.body
    );
    return res.status(200).json(new_piggybank);
  } catch (error) {
    next(error);
  }
}
async function piggybank_remove(req, res, next) {
  try {
    const deleted_piggybank = await piggybankService.deletePiggybank(
      req.params.piggybankId
    );
    return res.status(204).json(deleted_piggybank);
  } catch (error) {
    next(error);
  }
}
async function piggybanks_details(req, res, next) {
  try {
    const piggybanks = await piggybankService.getAllPiggybanks(
      req.params.accountId
    );
    return res.status(200).json(piggybanks);
  } catch (error) {
    next(error);
  }
}
async function piggybank_add_money(req, res, next) {
  try {
    const piggybankAmount = await piggybankService.addMoney(
      req.params.piggybankId
    );
    return res.status(200).json(piggybankAmount);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  piggybank_create,
  piggybank_details,
  piggybank_edit,
  piggybanks_details,
  piggybank_remove,
  piggybank_add_money,
};
