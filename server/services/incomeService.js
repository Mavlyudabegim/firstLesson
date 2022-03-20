const Income = require('../models/incomes');
const Account = require('../models/accounts');
async function getOneIncome(id) {
  const incomeVal = await Income.findById(id);
  return incomeVal;
}
async function createIncome(accountId, newIncome, userId) {
  const income_data = { ...newIncome, accountId, userId };
  const income = await Income.create(income_data);
  return income;
}
async function updateIncome(id, updatedIncome) {
  const newIncome = await Income.findByIdAndUpdate(id, updatedIncome);
  return newIncome;
}
async function deleteIncome(id) {
  const deletedIncome = await Income.findOneAndDelete(id);
  return deletedIncome;
}
async function getAllIncomes(accountId) {
  const incomes = await Income.find({ accountId });
  return incomes;
}

module.exports = {
  getAllIncomes,
  getOneIncome,
  deleteIncome,
  createIncome,
  updateIncome,
};
