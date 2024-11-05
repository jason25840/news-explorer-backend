const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (isCelebrateError(err)) {
    const errorDetails = {};
    err.details.forEach((value, segment) => {
      errorDetails[segment] = value.details.map((detail) => detail.message);
    });
    statusCode = 400;
    message = 'Validation Error';
    return res.status(statusCode).json({ message, details: errorDetails });
  }

  return res.status(statusCode).json({ message });
};

module.exports = errorHandler;
