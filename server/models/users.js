const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },

    username: {
      type: String,
      min: 5,
      max: 100,
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
