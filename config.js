require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/news-explorer-db',
  jwtSecret: process.env.JWT_SECRET || 'aW9#f8!sPz$71MvRk@2Nd%Ls^5aB3Uj1',
  port: process.env.PORT || 3001,
};