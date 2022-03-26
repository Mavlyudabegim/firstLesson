const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    title: { type: String, unique: true, required: true },
    description: { type: String, maxlength: 200 },
    firstDayOfPayment: { type: Date, default: Date() },
    lastDayOfPayment: { type: Date, default: Date() },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subscriptionAmount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Subscription', subscriptionSchema);
