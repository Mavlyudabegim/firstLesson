const incomeSchema = require('../models/incomes');
const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, unique: true },
    sum: { type: Number, required: true, default: 0 },
    currencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    expensesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense' },
    incomesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Income' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Account', accountSchema);
