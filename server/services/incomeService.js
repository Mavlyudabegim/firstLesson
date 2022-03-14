const income = require('../data/incomeData');
const getOneIncome = (id) => {
  const incomeVal = income[id];
  return incomeVal;
};
const createIncome = (newIncome) => {
  income[income.accountId] = newIncome;
  return newIncome;
};
const updateIncome = (id, updatedIncome) => {
  income[id] = updatedIncome;
  return updatedIncome;
};
const deleteIncome = (id) => {
  delete income[id];
  return 'Income has been removed';
};
const getAllIncomes = () => {
  return income;
};

module.exports = {
  getAllIncomes,
  getOneIncome,
  deleteIncome,
  createIncome,
  updateIncome,
};
