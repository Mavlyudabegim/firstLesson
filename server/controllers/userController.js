const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
async function registration(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error', errors.array()));
    }
    const userData = await userService.registration(
      req.body.email,
      req.body.password
    );
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
}
async function login(req, res, next) {
  try {
    const userData = await userService.login(req.body.email, req.body.password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
}
async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json(token);
  } catch (error) {
    next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
}
async function getUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
async function activate(req, res, next) {
  try {
    const activationLink = req.params.link;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  registration,
  login,
  refresh,
  getUsers,
  logout,
  activate,
};
