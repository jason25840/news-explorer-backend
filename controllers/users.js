const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { NotFoundError } = require('../utils/notFoundError');
const { ConflictError } = require('../utils/conflictError');
const InternalServerError = require('../utils/internalServerError');
const { UnauthorizedError } = require('../utils/unauthorizedError');

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    if (error.code === 11000) {
      next(new conflictError('Email already exists'));
    } else {
      next(new internalServerError('An error occurred while creating the user'));
    }
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Invalid email or password'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError('Invalid email or password'));
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ token });
  } catch (error) {
    next(new InternalServerError('An error occurred during login'));
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(new NOT_FOUND('User not found'));
    }
    res.send(user);
  } catch (error) {
    next(new InternalServerError('An error occurred while fetching user data'));
  }
}

const removeCurrentuser = (req, res) => {
  res.status(204).send();
};

module.exports = { createUser, loginUser, getCurrentUser, removeCurrentuser };
