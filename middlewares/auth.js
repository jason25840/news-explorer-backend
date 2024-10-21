const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/unauthorizedError');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('No token provided'));
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload._id) {
      return next(new UnauthorizedError('Invalid token payload'));
    }

    req.user = { _id: payload._id };
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid token provided'));
  }
};


module.exports = auth;