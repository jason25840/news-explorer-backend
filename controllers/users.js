const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

// Signup controller
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) =>
      User.create({ email, password: hash, name })
    )
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name
    }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: 'User with this email already exists' });
      } else {
        next(err);
      }
    });
};

// Login controller
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch(() => res.status(401).send({ message: 'Incorrect email or password' }));
};

module.exports = {
  createUser,
  loginUser,
};