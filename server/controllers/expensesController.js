const expensesService = require('../services/expensesService');
async function expense_details(req, res) {
  try {
    const expense = await expensesService.getOneExpense(req.params.id);
    return res.json(expense);
  } catch (error) {
    res.json(error);
  }
}
async function expenses_details(req, res) {
  try {
    return res.status(200).json(await expensesService.getAllExpenses());
  } catch (error) {
    res.json(error);
  }
}
async function expenses_create(req, res) {
  try {
    const expense = await expensesService.createExpense(req.body);
    return res.status(201).json(expense);
  } catch (error) {
    res.json(error);
  }
}
async function expenses_edit(req, res) {
  try {
    const newExpense = await expensesService.updateExpence(
      req.params.id,
      req.body
    );
    return res.json(newExpense);
  } catch (error) {
    res.json(error);
  }
}
async function expenses_remove(req, res) {
  try {
    return res.json(await expensesService.deleteOneExpence(req.params.id));
  } catch (error) {
    res.json(error);
  }
}
module.exports = {
  expense_details,
  expenses_create,
  expenses_edit,
  expenses_remove,
  expenses_details,
};
