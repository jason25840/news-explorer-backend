const { requestLogger } = require('./logger');

const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    query: req.query,
    body: req.body,
  });

  next();
};

module.exports = logRequests;