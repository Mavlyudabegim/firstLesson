const accountService = require('../services/accountService');
async function account_details(req, res) {
  try {
    const account = await accountService.getOneAccount(req.params.id);
    return res.json(account);
  } catch (error) {
    res.json(error);
  }
}
async function account_create(req, res) {
  try {
    const user = await accountService.createAccount(req.body);
    return res.json(user);
  } catch (error) {
    res.json(error);
  }
}
async function accounts_details(req, res) {
  try {
    return res.status(200).send(await accountService.getAllAccounts());
  } catch (error) {
    res.send(error);
  }
}
async function account_edit(req, res) {
  try {
    const newUser = await accountService.updateAccount(req.body, req.params.id);
    return res.json(newUser);
  } catch (error) {
    res.json(error);
  }
}
async function account_delete(req, res) {
  try {
    return res.json(await accountService.removeOneAccount(req.params.id));
  } catch (error) {
    res.json(error);
  }
}
module.exports = {
  account_details,
  account_create,
  accounts_details,
  account_edit,
  account_delete,
};
