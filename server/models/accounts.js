const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    currency: { type: String, enum: ['$', '€'], default: '$' },
    balance: { type: Number, default: 0, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
module.exports = mongoose.model('Account', accountSchema);
