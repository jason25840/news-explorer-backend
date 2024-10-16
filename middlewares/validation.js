const { Joi, celebrate } = require('celebrate');

// Validation schema for signup
const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.empty': 'Password is required',
    }),
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must not exceed 30 characters',
      'string.empty': 'Name is required',
    }),
  }),
});

// Validation schema for login
const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
    }),
  }),
});

module.exports = {
  signupValidation,
  loginValidation,
};