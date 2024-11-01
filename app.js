require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const config = require('./config');

const logRequests = require('./middlewares/requestHandler');
const errorHandler = require('./middlewares/errorHandler');
const logErrors = require('./middlewares/logErrors');
const rateLimiter = require('./middlewares/rateLimiter');
const { infoLogger } = require('./middlewares/logger');

const routes = require('./routes');

const app = express();
const PORT = config.port || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logRequests);
app.use(rateLimiter);

mongoose
  .connect(config.mongoURI)
  .then(() => infoLogger.info('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the News Explorer Backend');
});

app.use(errors());
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.error(`Server is running on http://localhost:${PORT}`);
});