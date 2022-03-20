const Account = require('../models/accounts');
const Expense = require('../models/expenses');
const Income = require('../models/incomes');
const mongoose = require('mongoose');
async function getOneAccount(id) {
  const account = await Account.findById(id);
  return account;
}
async function createAccount(account, userId) {
  const account_data = { ...account, userId };
  const new_account = await Account.create(account_data);
  return new_account;
}
async function getAllAccounts(userId) {
  const accounts = await Account.find({ userId });
  return accounts;
}
async function updateAccount(id, updatedAccount) {
  const newUser = await Account.findByIdAndUpdate(id, updatedAccount);
  return newUser;
}
async function removeOneAccount(accountId) {
  const deleted_account = await Account.findByIdAndDelete(accountId);
  await Income.deleteMany({ accountId });
  await Expense.deleteMany({ accountId });
  return deleted_account;
}

const calculateIncomeSum = async (accountId) => {
  const incomes = await Income.find({ accountId });
  const sum = incomes.reduce((acc, el) => acc + el.incomeAmount, 0);
  return sum;
};
const calculateExpenseSum = async (accountId) => {
  const expenses = await Expense.find({ accountId });
  const sum = expenses.reduce((acc, el) => acc + el.expenseAmount, 0);
  return sum;
};
module.exports = {
  getAllAccounts,
  getOneAccount,
  removeOneAccount,
  updateAccount,
  createAccount,
  calculateIncomeSum,
  calculateExpenseSum,
};
