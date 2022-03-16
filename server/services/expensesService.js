const Expenses = require('../models/expenses');
async function getOneExpense(id) {
  const expense = await Expenses.findById(id);
  return expense;
}
async function getAllExpenses() {
  return await Expenses.find();
}
async function createExpense(expense) {
  const new_expense = await Expenses.create(expense);
  return new_expense;
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
