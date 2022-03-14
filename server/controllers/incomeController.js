const incomeService = require('../services/incomeService');
const income_details = (req, res) => {
  try {
    const incomeVal = incomeService.getOneIncome(req.params.id);
    return res.send(incomeVal);
  } catch (error) {
    res.send(error);
  }
};
const income_create = (req, res) => {
  try {
    return res.status(201).send(incomeService.createIncome(req.body));
  } catch (error) {
    res.send(error);
  }
};
const income_edit = (req, res) => {
  try {
    const newIncome = incomeService.updateIncome(req.params.id, req.body);
    return res.send(newIncome);
  } catch (error) {
    res.send(error);
  }
};
const income_remove = (req, res) => {
  try {
    res.send(incomeService.deleteIncome(req.params.id));
  } catch (error) {
    res.send(error);
  }
};
const incomes_details = (req, res) => {
  try {
    res.status(200).send(incomeService.getAllIncomes());
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  income_create,
  income_details,
  income_edit,
  incomes_details,
  income_remove,
};
