const Transaction = require('../models/transaction');
const Account = require('../models/accounts');
const ApiError = require('../exceptions/api-error');
async function getOneTransaction(transactionId) {
  const incomeVal = await Transaction.findById(transactionId);
  return incomeVal;
}
async function createTransaction(accountId, categoryId, newTransaction) {
  const transaction_data = { accountId, categoryId, ...newTransaction };
  const account = await Account.findById(accountId);
  if (!account) {
    throw ApiError.BadRequest('Account was not found');
  }
  const transaction = await Transaction.create(transaction_data);
  return transaction;
}
async function updateTransaction(transactionId, updatedTransaction) {
  const newTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    updatedTransaction
  );
  return newTransaction;
}
async function deleteTransaction(transactionId) {
  const deletedTransaction = await Transaction.findOneAndDelete(transactionId);
  return deletedTransaction;
}
async function getAllTransactions(accountId) {
  const transactions = await Transaction.find({ accountId });
  return transactions;
}

module.exports = {
  getAllTransactions,
  getOneTransaction,
  deleteTransaction,
  createTransaction,
  updateTransaction,
};
