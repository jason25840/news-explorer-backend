const { createLogger, transports, format } = require('winston');
const path = require('path');

const logFormat = format.combine(
  format.timestamp(),
  format.json()
);

const requestLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/request.log') }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: logFormat,
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/error.log') }),
  ],
});

module.exports = { requestLogger, errorLogger };