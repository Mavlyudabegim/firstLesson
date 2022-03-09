const bcrypt = require('bcrypt');
const users = [];

function registerUser(user) {
  users.push({
    id: Math.trunc(Math.random() * 100),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.roles,
  });
}

function getUserByEmail(email) {
  return users.find((user) => {
    if (user.email === email) return user;
  });
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = { users, loginUser, getUserByEmail, registerUser };
