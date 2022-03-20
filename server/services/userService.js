const User = require('../models/users');
async function getOneUser(id) {
  const one_user = await User.findById(id);
  return one_user;
}
async function createUser(account) {
  const user = await User.create(account);
  return user;
}
async function getAllUsers() {
  const users = await User.find();
  return users;
}
async function updateUser(updatedUser, id) {
  const newUser = await User.findByIdAndUpdate(updatedUser, id);
  return newUser;
}
async function removeOneUser(id) {
  const deleted_user = await User.findByIdAndDelete(id);
  return deleted_user;
}
module.exports = {
  getAllUsers,
  getOneUser,
  removeOneUser,
  updateUser,
  createUser,
};
