const expenses = require('../data/expensesData');
const getOneExpense = (id) => {
  const expense = expenses[id];
  return expense;
};
const getAllExpenses = () => {
  return expenses;
};
const createExpense = (expense) => {
  expenses[expense.id] = expense;
  return expense;
};
const updateExpence = (id, updatedExpence) => {
  expenses[id] = updatedExpence;
  return updatedExpence;
};
const deleteOneExpence = (id) => {
  delete expenses[id];
  return 'Expense has been removed';
};
module.exports = {
  getOneExpense,
  createExpense,
  updateExpence,
  deleteOneExpence,
  getAllExpenses,
};
