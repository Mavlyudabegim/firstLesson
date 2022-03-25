const accountService = require('../services/accountService');
async function account_details(req, res, next) {
  try {
    const account = await accountService.getOneAccount(req.params.accountId);
    return res.status(200).json(account);
  } catch (error) {
    next(error);
  }
}
async function account_create(req, res, next) {
  try {
    const account = await accountService.createAccount(
      req.body,
      req.params.userId
    );

    return res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}
async function accounts_details(req, res, next) {
  try {
    const accounts = await accountService.getAllAccounts(req.params.userId);
    return res.status(200).send(accounts);
  } catch (error) {
    next(error);
  }
}
async function account_edit(req, res, next) {
  try {
    const newAccount = await accountService.updateAccount(
      req.params.accountId,
      req.body
    );
    return res.status(200).json(newAccount);
  } catch (error) {
    next(error);
  }
}
async function account_delete(req, res, next) {
  try {
    const deleted_account = await accountService.removeOneAccount(
      req.params.accountId
    );
    return res.status(204).json(deleted_account);
  } catch (error) {
    next(error);
  }
}
async function account_incomes(req, res, next) {
  try {
    const incomes = await accountService.incomesByAccount(req.params.accountId);
    res.status(200).json(incomes.incomes);
  } catch (error) {
    next(error);
  }
}

const getBalance = async (req, res, next) => {
  try {
    const sum = await accountService.calculateBalance(req.params.accountId);
    return res.status(200).json({ sum });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  account_details,
  account_create,
  accounts_details,
  account_edit,
  account_delete,
  account_incomes,
  getBalance,
};
