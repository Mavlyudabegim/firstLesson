const User = require('../models/users');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const mailService = require('./mailService');
async function registration(email, password) {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw ApiError.BadRequest('User with this email already exists');
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuid.v4();
  const user = await User.create({
    email,
    password: hashPassword,
    activationLink,
  });
  // await mailService.sendActivationMail(
  //   email,
  //   `${process.env.API_URL}/api/activate/${activationLink}`
  // );
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}
async function activate(activationLink) {
  const user = await User.findOne({ activationLink });
  if (!user) {
    throw ApiError.BadRequest('incorrect activation link');
  }
  user.isActivated = true;
  await user.save();
}
async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest('User with this email has not been found');
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest('Incorrect password');
  }
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}
async function logout(refreshToken) {
  const token = await tokenService.removeToken(refreshToken);
  return token;
}
async function refresh(refreshToken) {
  if (!refreshToken) {
    throw ApiError.UnathorizedError();
  }
  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw ApiError.UnathorizedError();
  }
  const user = await User.findById(userData.id);
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
}
async function getAllUsers() {
  const users = await User.find();
  return users;
}
module.exports = {
  registration,
  login,
  logout,
  refresh,
  getAllUsers,
  activate,
};
