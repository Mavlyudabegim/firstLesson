const transactionService = require('../services/transactionService');
async function transaction_details(req, res, next) {
  try {
    const transactionVal = await transactionService.getOneTransaction(
      req.params.transactionId
    );
    return res.status(200).json(transactionVal);
  } catch (error) {
    next(error);
  }
}
async function transaction_create(req, res, next) {
  try {
    const new_transaction = await transactionService.createTransaction(
      req.params.accountId,
      req.params.categoryId,
      req.body
    );
    return res.status(201).json(new_transaction);
  } catch (error) {
    next(error);
  }
}
async function transaction_edit(req, res, next) {
  try {
    const new_transaction = await transactionService.updateTransaction(
      req.params.transactionId,
      req.body
    );
    return res.status(200).json(new_transaction);
  } catch (error) {
    next(error);
  }
}
async function transaction_remove(req, res, next) {
  try {
    const deleted_transaction = await transactionService.deleteTransaction(
      req.params.transactionId
    );
    return res.status(204).json(deleted_transaction);
  } catch (error) {
    next(error);
  }
}
async function transactions_details(req, res, next) {
  try {
    const transactions = await transactionService.getAllTransactions(
      req.params.accountId
    );
    return res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  transaction_create,
  transaction_details,
  transaction_edit,
  transactions_details,
  transaction_remove,
};
