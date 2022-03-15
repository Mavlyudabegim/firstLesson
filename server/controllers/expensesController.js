const expensesService = require('../services/expensesService');
const expense_details = (req, res) => {
  try {
    const expense = expensesService.getOneExpense(req.params.id);
    return res.send(expense);
  } catch (error) {
    res.send(error);
  }
};
const expenses_details = (req, res) => {
  try {
    return res.status(200).send(expensesService.getAllExpenses());
  } catch (error) {
    res.send(error);
  }
};
const expenses_create = (req, res) => {
  try {
    const expense = expensesService.createExpense(req.body);
    return res.status(201).send(expense);
  } catch (error) {
    res.send(error);
  }
};
const expenses_edit = (req, res) => {
  try {
    const newExpense = expensesService.updateExpence(req.params.id, req.body);
    return res.send(newExpense);
  } catch (error) {
    res.send(error);
  }
};
const expenses_remove = (req, res) => {
  try {
    return res.send(expensesService.deleteOneExpence(req.params.id));
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  expense_details,
  expenses_create,
  expenses_edit,
  expenses_remove,
  expenses_details,
};
