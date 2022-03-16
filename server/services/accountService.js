const Account = require('../models/accounts');
async function getOneAccount(id) {
  const account = await Account.findById(id);
  return account;
}
async function createAccount(account) {
  const user = await Account.create(account);
  return user;
}
async function getAllAccounts() {
  const accounts = await Account.find();
  return accounts;
}
async function updateAccount(updatedAccount, id) {
  const newUser = await Account.findByIdAndUpdate(updatedAccount, id);
  return newUser;
}
async function removeOneAccount(id) {
  const deleted_account = Account.findByIdAndDelete(id);
  return deleted_account;
}
module.exports = {
  getAllAccounts,
  getOneAccount,
  removeOneAccount,
  updateAccount,
  createAccount,
};
