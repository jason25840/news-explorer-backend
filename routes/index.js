const express = require('express');
const userRoutes = require('./users');
const articleRoutes = require('./articles');
const NotFoundError = require('../utils/notFoundError');


const router = express.Router();

router.use('/', userRoutes);
router.use('/articles', articleRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Resource not found'));
});


module.exports = router;