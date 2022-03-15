const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
  incomeTitle: {
    type: String,
    required: true,
    min: 10,
    max: 150,
    default: 'Title of your income',
  },
  incomeAmount: { type: Number, required: true, default: 0 },
  sum: { type: Number, required: true },
  currency: { type: String, required: true },
  expenses: [expenseSchema],
  incomes: [incomeSchema],
});
module.exports = mongoose.model('Account', incomeSchema);
