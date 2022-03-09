const User = require('../models/user');
function jwtCallback(jwtPayload, done) {
  const user = User.getUserByEmail(jwtPayload.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
}

module.exports = { jwtCallback };
