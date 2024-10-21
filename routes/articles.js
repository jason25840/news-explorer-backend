const express = require('express');
const { saveArticle, getArticles, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getArticles);

router.post('/', auth, saveArticle);

router.delete('/:articleId', auth, deleteArticle);

module.exports = router;