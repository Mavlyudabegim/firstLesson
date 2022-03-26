const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Expense', 'Income'], default: 'Expense' },
});
module.exports = mongoose.model('Category', categorySchema);
