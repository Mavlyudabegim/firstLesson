const Account = require('../models/accounts');
const Transaction = require('../models/transaction');
const Subscription = require('../models/subscription');
const Piggybank = require('../models/piggybank');
const User = require('../models/users');
const ApiError = require('../exceptions/api-error');
async function getOneAccount(id) {
  const account = await Account.findById(id);
  return account;
}
async function createAccount(account, userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.BadRequest('User was not found');
  }
  const account_data = { ...account, userId };
  const new_account = await Account.create(account_data);
  await new_account.save();
  return new_account;
}
async function getAllAccounts(userId) {
  const accounts = await Account.find({ userId });
  return accounts;
}
async function updateAccount(accountId, updatedAccount) {
  const newUser = await Account.findByIdAndUpdate(accountId, updatedAccount);
  return newUser;
}
async function removeOneAccount(accountId) {
  const deleted_account = await Account.findByIdAndDelete(accountId);
  await Transaction.deleteMany({ accountId });
  await Subscription.deleteMany({ accountId });
  await Piggybank.deleteMany({ accountId });
  return deleted_account;
}
module.exports = {
  getAllAccounts,
  getOneAccount,
  removeOneAccount,
  updateAccount,
  createAccount,
};
