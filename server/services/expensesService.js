const Expenses = require('../models/expenses');
async function getOneExpense(id) {
  const expense = await Expenses.findById(id);
  return expense;
}
async function getAllExpenses(accountId) {
  const expenses = await Expenses.find({ accountId });
  return expenses;
}
async function createExpense(accountId, newExpense, userId) {
  const expense_data = { ...newExpense, accountId, userId };
  const expense = await Expenses.create(expense_data);
  return expense;
}
async function updateExpence(id, updatedExpence) {
  const updated_expense = await Expenses.findByIdAndUpdate(id, updatedExpence);
  return updated_expense;
}
async function deleteOneExpence(id) {
  const deletedAccount = await Expenses.findByIdAndDelete(id);
  return deletedAccount;
}
module.exports = {
  getOneExpense,
  createExpense,
  updateExpence,
  deleteOneExpence,
  getAllExpenses,
};
