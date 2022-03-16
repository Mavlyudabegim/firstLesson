const incomeSchema = require('./incomes');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    lowercase: true,
    validate: [validator.default.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  isAdmin: { type: Boolean, default: false },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    min: 5,
    max: 100,
  },
});
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model('User', userSchema);
