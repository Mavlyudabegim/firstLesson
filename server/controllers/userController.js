const userService = require('../services/userService');
async function user_details(req, res) {
  try {
    const user = await userService.getOneUser(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function user_create(req, res) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function users_details(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
}
async function user_edit(req, res) {
  try {
    const newUser = await userService.updateUser(req.body, req.params.id);
    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}
async function user_delete(req, res) {
  try {
    const removed_user = await userService.removeOneUser(req.params.id);
    return res.status(204).json(removed_user);
  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = {
  user_details,
  user_create,
  users_details,
  user_edit,
  user_delete,
};
