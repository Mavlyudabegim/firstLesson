const userService = require('../services/userService');
async function user_details(req, res) {
  try {
    const user = await userService.getOneUser(req.params.id);
    return res.json(user);
  } catch (error) {
    res.json(error);
  }
}
async function user_create(req, res) {
  try {
    const user = await userService.createUser(req.body);
    return res.json(user);
  } catch (error) {
    res.json(error);
  }
}
async function users_details(req, res) {
  try {
    return res.status(200).send(await userService.getAllUsers());
  } catch (error) {
    res.send(error);
  }
}
async function user_edit(req, res) {
  try {
    const newUser = await userService.updateUser(req.body, req.params.id);
    return res.json(newUser);
  } catch (error) {
    res.json(error);
  }
}
async function user_delete(req, res) {
  try {
    return res.json(await userService.removeOneUser(req.params.id));
  } catch (error) {
    res.json(error);
  }
}
module.exports = {
  user_details,
  user_create,
  users_details,
  user_edit,
  user_delete,
};
