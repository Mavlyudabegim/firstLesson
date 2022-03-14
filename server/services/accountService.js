const accounts = require('../data/accountData');
const getOneAccount = (id) => {
  const account = accounts[id];
  return account;
};
const createAccount = (account) => {
  const user = account;
  accounts[account.id] = user;
  return user;
};
const getAllAccounts = () => {
  return accounts;
};
const updateAccount = (updatedAccount, id) => {
  const newUser = updatedAccount;
  accounts[id] = newUser;
  return newUser;
};
const removeOneAccount = (id) => {
  delete accounts[id];
  return 'Account has been removed';
};
module.exports = {
  getAllAccounts,
  getOneAccount,
  removeOneAccount,
  updateAccount,
  createAccount,
};
