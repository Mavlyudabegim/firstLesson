const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
  const user = User.loginUser(req.body.email, req.body.password);
  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
module.exports = router;
