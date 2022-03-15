const incomeSchema = require('../models/incomes');
const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sum: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true },
  expenses: [expenseSchema],
  incomes: [incomeSchema],
});
module.exports = mongoose.model('Account', accountSchema);
