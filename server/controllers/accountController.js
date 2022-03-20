const accountService = require('../services/accountService');
async function account_details(req, res) {
  try {
    const account = await accountService.getOneAccount(req.params.id);
    return res.status(200).json(account);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function account_create(req, res) {
  try {
    const account = await accountService.createAccount(req.body, req.userId);
    return res.status(201).json(account);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function accounts_details(req, res) {
  try {
    const accounts = await accountService.getAllAccounts(req.userId);
    return res.status(200).send(accounts);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function account_edit(req, res) {
  try {
    const newAccount = await accountService.updateAccount(
      req.params.id,
      req.body
    );
    return res.status(200).json(newAccount);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function account_delete(req, res) {
  try {
    const deleted_account = await accountService.removeOneAccount(
      req.params.id
    );
    return res.status(204).json(deleted_account);
  } catch (er) {
    res.status(500).json(error);
  }
}
async function account_incomes(req, res) {
  try {
    const incomes = await accountService.incomesByAccount(req.params.id);
    res.status(200).json(incomes.incomes);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getIncomeSum = async (req, res) => {
  try {
    const sum = await accountService.calculateIncomeSum(req.params.id);
    res.status(200).json({ sum });
  } catch (error) {
    res.status(500).json(err);
  }
};
const getExpenseSum = async (req, res) => {
  try {
    const sum = await accountService.calculateExpenseSum(req.params.id);
    res.status(200).json({ sum });
  } catch (error) {
    res.status(500).json(err);
  }
};
module.exports = {
  account_details,
  account_create,
  accounts_details,
  account_edit,
  account_delete,
  account_incomes,
  getIncomeSum,
  getExpenseSum,
};
