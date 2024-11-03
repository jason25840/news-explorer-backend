require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./middlewares/corsConfig');
const { errors } = require('celebrate');
const helmet = require('helmet');
const config = require('./config');

const errorHandler = require('./middlewares/errorHandler');
const logErrors = require('./middlewares/logErrors');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger } = require('./middlewares/logger');

const routes = require('./routes');

const app = express();
const PORT = config.port || 3001;

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => infoLogger.info(`Connected to MongoDB (${process.env.NODE_ENV || 'development'})`))
  .catch((err) => infoLogger.error(`MongoDB connection error (${process.env.NODE_ENV || 'development'}):`, err));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the News Explorer Backend');
});

app.use(errors());
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.error(`Server is running on http://localhost:${PORT}`);
});