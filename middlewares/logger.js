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

const infoLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../logs/info.log') }),
  ],
});

module.exports = { requestLogger, errorLogger, infoLogger };