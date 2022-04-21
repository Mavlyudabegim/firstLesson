const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      default: 'Expense',
      required: true,
    },
    description: { type: String, maxlength: 200 },
    paymentDate: {
      type: Date,
      default: Date.now(),
    },
    categories: [{ type: 'String' }],
    transactionAmount: { type: Number, default: 0 },
    imgLink: { type: Object },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Transaction', transactionSchema);
