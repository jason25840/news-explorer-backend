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
    url: Joi.string().uri().required().messages({
      'string.uri': 'URL must be valid',
      'any.required': 'URL is required',
    }),
    urlToImage: Joi.string().uri().required().messages({
      'string.uri': 'Image URL must be valid',
      'any.required': 'Image URL is required',
    }),
  }),
});

const articleIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required().messages({
      'string.length': 'Article ID must be 24 characters long',
      'string.hex': 'Article ID must be a valid hex string',
      'any.required': 'Article ID is required',
    }),
  }),
});

module.exports = {
  signupValidation,
  loginValidation,
  articleValidation,
  articleIdValidation,
};