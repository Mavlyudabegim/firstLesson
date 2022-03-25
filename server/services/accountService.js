const Account = require('../models/accounts');
const Transaction = require('../models/transaction');
const Subscription = require('../models/subscription');
const User = require('../models/users');
const ApiError = require('../exceptions/api-error');
async function getOneAccount(id) {
  const account = await Account.findById(id);
  return account;
}
async function createAccount(account, userId, categoryId) {
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
  return deleted_account;
}

const calculateBalance = async (accountId) => {
  const transactions = await Transaction.find({ accountId });
  const expenseSum = transactions
    .filter((el) => {
      if (el.type === 'Expense') return el;
    })
    .reduce((acc, el) => acc + el.transactionAmount, 0);

  const incomeSum = transactions
    .filter((el) => {
      if (el.type === 'Income') return el;
    })
    .reduce((acc, el) => acc + el.transactionAmount, 0);
  const account = await Account.findById(accountId);
  if (!account) {
    throw ApiError.BadRequest('Account was not found');
  }
  const sum = incomeSum - expenseSum;
  account.balance = sum;
  await account.save();
  return sum;
};

module.exports = {
  getAllAccounts,
  getOneAccount,
  removeOneAccount,
  updateAccount,
  createAccount,
  calculateBalance,
};
