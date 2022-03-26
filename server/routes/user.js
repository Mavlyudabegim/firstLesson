const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth-middleware');
const { body } = require('express-validator');
router.post(
  '/registration',
  jsonParser,
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.get('/activate/:link', userController.activate);
router.post('/login', jsonParser, userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
