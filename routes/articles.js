const express = require('express');
const { saveArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { articleValidation, articleIdValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getArticles);
router.post('/', auth, articleValidation, saveArticle);
router.delete('/:articleId', auth, articleIdValidation, deleteArticle);

module.exports = router;