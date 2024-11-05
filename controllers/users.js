const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const User = require('../models/user');
const constants = require('../utils/constants');

const InternalServerError = require('../utils/internalServerError');
const UnauthorizedError = require('../utils/unauthorizedError');
const NotFoundError = require('../utils/notFoundError');
const ConflictError = require('../utils/conflictError');

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(201).send({ message: constants.USER_CREATED_SUCCESS, user: userWithoutPassword });
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError(constants.EMAIL_ALREADY_EXISTS));
    }
    return next(new InternalServerError(constants.INTERNAL_USER_CREATE_ERROR));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError(constants.INVALID_LOGIN_CREDENTIALS));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError(constants.INVALID_LOGIN_CREDENTIALS));
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
    return res.send({ token });
  } catch (error) {
    return next(new InternalServerError(constants.LOGIN_INTERNAL_ERROR));
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(new NotFoundError(constants.USER_NOT_FOUND));
    }
    return res.send(user);
  } catch (error) {
    return next(new InternalServerError(constants.USER_DATA_FETCH_ERROR));
  }
}

const removeCurrentuser = (res) => res.status(204).send();

module.exports = { createUser, loginUser, getCurrentUser, removeCurrentuser };