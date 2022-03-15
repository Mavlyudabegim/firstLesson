const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema(
  {
    incomeTitle: {
      account: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
      type: String,
      required: true,
      min: 10,
      max: 150,
      default: 'Title of your expense',
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    incomeAmount: { type: Number, required: true, default: 0 },
    currency: { type: String, required: true },
    comments: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Expense', expenseSchema);
