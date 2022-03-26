const mongoose = require('mongoose');
const piggybankSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    title: { type: String, unique: true, required: true },
    description: { type: String, maxlength: 200 },
    goalAmount: { type: Number, default: 0 },
    availableAmount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Piggybank', piggybankSchema);
