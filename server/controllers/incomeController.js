const incomeService = require('../services/incomeService');
async function income_details(req, res) {
  try {
    const incomeVal = await incomeService.getOneIncome(req.params.id);
    return res.status(200).json(incomeVal);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function income_create(req, res) {
  try {
    const new_income = await incomeService.createIncome(
      req.params.accountId,
      req.body,
      req.userId
    );
    return res.status(201).json(new_income);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function income_edit(req, res) {
  try {
    const new_income = await incomeService.updateIncome(
      req.params.id,
      req.body
    );
    return res.status(200).json(new_income);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function income_remove(req, res) {
  try {
    const deleted_income = await incomeService.deleteIncome(req.params.id);
    return res.status(204).json(deleted_income);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function incomes_details(req, res) {
  try {
    const incomes = await incomeService.getAllIncomes(req.params.accountId);
    return res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  income_create,
  income_details,
  income_edit,
  incomes_details,
  income_remove,
};
