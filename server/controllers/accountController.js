const accounts = require('../data/accountData');
const accountService = require('../services/accountService');
const account_details = (req, res) => {
  try {
    const account = accountService.getOneAccount(req.params.id);
    return res.send(account);
  } catch (error) {
    res.send(error);
  }
};
const account_create = (req, res) => {
  try {
    const user = accountService.createAccount(req.body);
    return res.send(user);
  } catch (error) {
    res.send(error);
  }
};
const accounts_details = (req, res) => {
  try {
    res.status(200).send(accountService.getAllAccounts());
  } catch (error) {
    res.send(error);
  }
};
const account_edit = (req, res) => {
  try {
    const newUser = accountService.updateAccount(req.body, req.params.id);
    return res.send(newUser);
  } catch (error) {
    res.send(error);
  }
};
const account_delete = (req, res) => {
  try {
    return res.send(accountService.removeOneAccount(req.params.id));
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  account_details,
  account_create,
  accounts_details,
  account_edit,
  account_delete,
};
