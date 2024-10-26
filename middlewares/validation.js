const { Joi, celebrate, Segments } = require('celebrate');

const signupValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required',
      }),
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name must not exceed 30 characters',
        'any.required': 'Name is required',
      }),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format',  // Custom message for invalid format
        'any.required': 'Email is required',      // Custom message for missing value
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required',  // Custom message for missing password
      }),
  }),
});

module.exports = {
  signupValidation,
  loginValidation,
};