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
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required',
      }),
  }),
});

const articleValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'any.required': 'Keyword is required',
    }),
    title: Joi.string().required().messages({
      'any.required': 'Title is required',
    }),
    text: Joi.string().required().messages({
      'any.required': 'Text is required',
    }),
    date: Joi.string().required().messages({
      'any.required': 'Date is required',
    }),
    source: Joi.string().required().messages({
      'any.required': 'Source is required',
    }),
    link: Joi.string().uri().required().messages({
      'string.uri': 'Link must be a valid URL',
      'any.required': 'Link is required',
    }),
    image: Joi.string().uri().required().messages({
      'string.uri': 'Image must be a valid URL',
      'any.required': 'Image is required',
    }),
  }),
});

module.exports = {
  signupValidation,
  loginValidation,
  articleValidation, // Export article validation
};