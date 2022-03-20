const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    incomeTitle: {
      type: String,
      required: true,
      min: 10,
      max: 150,
      default: 'Title of your income',
    },
    category: { type: String },
    incomeAmount: { type: Number, required: true, default: 0 },
    currency: { type: String },
    comments: { type: String, maxlength: 250 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Income', incomeSchema);
