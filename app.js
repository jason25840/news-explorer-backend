require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const logRequests = require('./middlewares/requestHandler');
const logErrors = require('./middlewares/errorHandler');

const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(logRequests);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api/articles', articleRoutes);

app.use(errors());
app.use(logErrors);

app.get('/', (req, res) => {
  res.send('Welcome to the News Explorer Backend');
});

app.use(errors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});