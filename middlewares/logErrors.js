const { isCelebrateError } = require('celebrate');
const { errorLogger } = require('./logger');

const logErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorDetails = {};
    err.details.forEach((value, segment) => {
      errorDetails[segment] = value.details.map((detail) => detail.message);
    });
    errorLogger.error({
      message: 'Validation Error',
      details: errorDetails,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
    });
  }

  next(err);
};

module.exports = logErrors;