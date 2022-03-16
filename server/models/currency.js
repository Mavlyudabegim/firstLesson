const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sign: { type: String, required: true, unique: true },
});
module.exports = mongoose.model('Currency', currencySchema);
