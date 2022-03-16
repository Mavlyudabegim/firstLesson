const incomeService = require('../services/incomeService');
async function income_details(req, res) {
  try {
    const incomeVal = await incomeService.getOneIncome(req.params.id);
    return res.json(incomeVal);
  } catch (error) {
    res.json(error);
  }
}
async function income_create(req, res) {
  try {
    return res.status(201).json(await incomeService.createIncome(req.body));
  } catch (error) {
    res.json(error);
  }
}
async function income_edit(req, res) {
  try {
    const newIncome = await incomeService.updateIncome(req.params.id, req.body);
    return res.json(newIncome);
  } catch (error) {
    res.json(error);
  }
}
async function income_remove(req, res) {
  try {
    return res.json(await incomeService.deleteIncome(req.params.id));
  } catch (error) {
    res.json(error);
  }
}
async function incomes_details(req, res) {
  try {
    return res.status(200).json(await incomeService.getAllIncomes());
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  income_create,
  income_details,
  income_edit,
  incomes_details,
  income_remove,
};
