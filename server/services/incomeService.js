const Income = require('../models/incomes');
async function getOneIncome(id) {
  const incomeVal = await Income.findById(id);
  return incomeVal;
}
async function createIncome(newIncome) {
  const income = await Income.create(newIncome);
  return income;
}
async function updateIncome(id, updatedIncome) {
  const newIncome = await Income.findByIdAndUpdate(id, updatedIncome);
  return newIncome;
}
async function deleteIncome(id) {
  const deletedIncome = await Income.findOneAndDelete(id);
  return deletedIncome;
}
async function getAllIncomes() {
  return await Income.find();
}

module.exports = {
  getAllIncomes,
  getOneIncome,
  deleteIncome,
  createIncome,
  updateIncome,
};
