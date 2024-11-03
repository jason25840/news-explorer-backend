// corsConfig.js
const cors = require('cors');

const allowedOrigins = [
  'https://newsexplorer.hackquest.com',
  'https://www.newsexplorer.hackquest.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = cors(corsOptions);