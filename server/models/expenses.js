const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    expenseTitle: {
      type: String,
      required: true,
      min: 10,
      max: 150,
      default: 'Title of your expense',
    },
    category: { type: String },
    expenseAmount: { type: Number, required: true, default: 0 },
    currency: { type: String },
    comments: { type: String, maxlength: 250 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Expense', expenseSchema);
