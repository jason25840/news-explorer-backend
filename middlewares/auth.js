const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
const UnauthorizedError = require('../utils/unauthorizedError');
const { jwtSecret } = require('../config');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError(constants.NO_TOKEN_PROVIDED));
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, jwtSecret);
    if (!payload._id) {
      return next(new UnauthorizedError(constants.INVALID_TOKEN_PAYLOAD));
    }
    req.user = { _id: payload._id };
    return next();
  } catch (err) {
    return next(new UnauthorizedError(constants.AUTHORIZATION_REQUIRED));
  }
};

module.exports = auth;