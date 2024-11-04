const allowedOrigins = [
  'http://localhost:3000',
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
methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
allowedHeaders: ['Authorization', 'Content-Type'],
credentials: true,
};

module.exports = (corsOptions);