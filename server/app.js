require('./auth/passport');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const api = require('./routes/index');
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtCallback } = require('./auth/passport');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(api);
app.use(passport.initialize());
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY,
};
const auth = passport.authenticate('jwt', { session: false });
passport.use(new jwtStrategy(opts, jwtCallback));

module.exports = app;
