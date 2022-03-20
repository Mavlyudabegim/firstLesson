const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const userController = require('../controllers/userController');
// Get user
router.get('/:id', userController.user_details);
// Create user
router.post('/new-user', jsonParser, userController.user_create);
// Get all user
router.get('/', userController.users_details);
// Edit user
router.put('/:id', userController.user_edit);
// Delete an user
router.delete('/:id', userController.user_delete);

module.exports = router;
