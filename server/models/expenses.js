const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    expenseTitle: {
      type: String,
      required: true,
      min: 10,
      max: 150,
      default: 'Title of your expense',
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    expenseAmount: { type: Number, required: true, default: 0 },
    currencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    comments: { type: String, maxlength: 250 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Expense', expenseSchema);
