const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('Category', categorySchema);
