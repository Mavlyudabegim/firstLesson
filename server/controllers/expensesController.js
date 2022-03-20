const expensesService = require('../services/expensesService');
async function expense_details(req, res) {
  try {
    const expense = await expensesService.getOneExpense(req.params.id);
    return res.status(200).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function expenses_details(req, res) {
  try {
    const expenses = await expensesService.getAllExpenses(req.params.accountId);
    return res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function expenses_create(req, res) {
  try {
    const expense = await expensesService.createExpense(
      req.params.accountId,
      req.body,
      req.userId
    );
    return res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function expenses_edit(req, res) {
  try {
    const newExpense = await expensesService.updateExpence(
      req.params.id,
      req.body
    );
    return res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function expenses_remove(req, res) {
  try {
    const deleted_expense = await expensesService.deleteOneExpence(
      req.params.id
    );
    return res.status(204).json(deleted_expense);
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = {
  expense_details,
  expenses_create,
  expenses_edit,
  expenses_remove,
  expenses_details,
};
