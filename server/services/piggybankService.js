const Piggybank = require('../models/piggybank');
const Account = require('../models/accounts');
const ApiError = require('../exceptions/api-error');
async function getOnePiggybank(piggybankId) {
  const piggybankVal = await Piggybank.findById(piggybankId);
  return piggybankVal;
}
async function createPiggybank(accountId, newPiggybank) {
  const piggybank_data = { accountId, ...newPiggybank };
  const account = await Account.findById(accountId);
  if (!account) {
    throw ApiError.BadRequest('Account was not found');
  }
  const piggybank = await Piggybank.create(piggybank_data);
  return piggybank;
}
async function updatePiggybank(piggybankId, updatedPiggybank) {
  const newPiggybank = await Piggybank.findByIdAndUpdate(
    piggybankId,
    updatedPiggybank
  );
  return newPiggybank;
}
async function deletePiggybank(piggybankId) {
  const deletedPiggybank = await Piggybank.findOneAndDelete(piggybankId);
  return deletedPiggybank;
}
async function getAllPiggybanks(accountId) {
  const piggybanks = await Piggybank.find({ accountId });
  return piggybanks;
}
async function addMoney(piggybankId) {
  const piggybank = await Piggybank.findById(piggybankId);
  const moneyAmount = Math.round(
    Math.random() * Math.round(piggybank.goalAmount / 2)
  );
  const account = await Account.findById(piggybank.accountId);

  if (account.balance < moneyAmount) {
    throw new Error('Added money is more than account balance');
  }
  if (piggybank.availableAmount > piggybank.goalAmount) {
    piggybank.availableAmount = piggybank.goalAmount;
    await piggybank.save();
    return piggybank;
  }
  piggybank.availableAmount += moneyAmount;
  account.balance -= moneyAmount;
  await piggybank.save();
  await account.save();
  return {
    availableAmount: piggybank.availableAmount,
    goal: piggybank.goal,
    accountBalance: account.balance,
  };
}
module.exports = {
  getAllPiggybanks,
  getOnePiggybank,
  deletePiggybank,
  createPiggybank,
  updatePiggybank,
  addMoney,
};
