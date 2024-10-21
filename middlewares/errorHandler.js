const { isCelebrateError } = require('celebrate');
const { errorLogger } = require('../logger');

const logErrors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorDetails = {};
    for (const [segment, value] of err.details.entries()) {
      errorDetails[segment] = value.details.map((detail) => detail.message);
    }

    errorLogger.error({
      message: 'Validation Error',
      details: errorDetails,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
    });

    return res.status(400).json({
      message: 'Validation Error',
      details: errorDetails,
    });
  }

  errorLogger.error({
    message: err.message || 'Internal Server Error',
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = logErrors;