const Transaction = require('../models/transaction');
const Account = require('../models/accounts');
const ApiError = require('../exceptions/api-error');
async function getOneTransaction(transactionId) {
  const transactionVal = await Transaction.findById(transactionId);
  return transactionVal;
}
async function createTransaction(accountId, newTransaction) {
  const transaction_data = { accountId, ...newTransaction };
  const account = await Account.findById(accountId);
  if (!account) {
    throw ApiError.BadRequest('Account was not found');
  }
  const transaction = await Transaction.create(transaction_data);

  if (newTransaction.type === 'Income') {
    account.balance += Number(newTransaction.transactionAmount);
  }
  if (newTransaction.type === 'Expense') {
    if (transaction.transactionAmount > account.balance) {
      throw new Error('Not enough bugdet in account');
    }
    account.balance -= newTransaction.transactionAmount;
  }
  await transaction.save();
  await account.save();
  return transaction;
}
async function updateTransaction(transactionId, updatedTransaction) {
  const transaction = await Transaction.findById(transactionId);
  const account = await Account.findById(transaction.accountId);
  if (
    updatedTransaction.transactionAmount !== transaction.transactionAmount &&
    updatedTransaction.type === transaction.type &&
    transaction.type === 'Income'
  ) {
    if (
      updatedTransaction.transactionAmount - transaction.transactionAmount >
      0
    ) {
      account.balance += Number(
        updatedTransaction.transactionAmount - transaction.transactionAmount
      );
    }
    if (
      updatedTransaction.transactionAmount - transaction.transactionAmount <
      0
    ) {
      account.balance -= Number(
        Math.abs(
          updatedTransaction.transactionAmount - transaction.transactionAmount
        )
      );
    }
  }
  if (
    updatedTransaction.transactionAmount !== transaction.transactionAmount &&
    updatedTransaction.type === transaction.type &&
    updatedTransaction.type === 'Expense'
  ) {
    if (
      updatedTransaction.transactionAmount - transaction.transactionAmount >
      0
    ) {
      account.balance -= Number(
        updatedTransaction.transactionAmount - transaction.transactionAmount
      );
    }
    if (
      updatedTransaction.transactionAmount - transaction.transactionAmount <
      0
    ) {
      account.balance += Number(
        Math.abs(
          updatedTransaction.transactionAmount - transaction.transactionAmount
        )
      );
    }
  }
  if (
    updatedTransaction.type !== transaction.type &&
    updatedTransaction.type === 'Income'
  ) {
    account.balance += Number(updatedTransaction.transactionAmount);
  }
  if (
    updatedTransaction.type !== transaction.type &&
    updatedTransaction.type === 'Expense'
  ) {
    account.balance -= Number(updatedTransaction.transactionAmount);
  }
  const newTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    updatedTransaction
  );
  await account.save();
  return newTransaction;
}
async function deleteTransaction(transactionId) {
  const deletedTransaction = await Transaction.findOneAndDelete(transactionId);
  const account = await Account.findById(deletedTransaction.accountId);
  if (deletedTransaction.type === 'Income') {
    account.balance -= deletedTransaction.transactionAmount;
  }
  if (deletedTransaction.type === 'Expense') {
    account.balance += deletedTransaction.transactionAmount;
  }
  await account.save();
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
