const express = require('express');
const userRoutes = require('./users');
const articleRoutes = require('./articles');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;