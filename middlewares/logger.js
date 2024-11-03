const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/request.log') }),
  ],
  format: logFormat,
  meta: true,
  expressFormat: true,
  colorize: false,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log') }),
  ],
  format: logFormat,
});

const infoLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, '../logs/info.log') }),
  ],
});

module.exports = { requestLogger, errorLogger, infoLogger };