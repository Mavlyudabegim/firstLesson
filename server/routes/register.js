const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  const user = User.getUserByEmail(email);
  if (user === undefined) {
    User.registerUser({ email, password, role });
    res.json(User.users);
  } else {
    res.json('This email has already been registered');
  }
});

module.exports = router;
