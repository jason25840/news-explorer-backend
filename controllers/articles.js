const Article = require('../models/article');
const { BadRequestError } = require('../utils/badRequestError');
const { NotFoundError } = require('../utils/notFoundError');
const { ForbiddenError } = require('../utils/forbiddenError');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    if (!articles || articles.length === 0) {
      throw new NotFoundError('No articles found for this user');
    }
    res.status(200).send(articles);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Invalid user ID'));
    } else {
      next(error);
    }
  }
};

const saveArticle = async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  try {
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      url: link,
      urlToImage: image,
      owner: req.user._id,
    });
    res.status(201).send(article);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid article data'));
    } else {
      next(error);
    }
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    if (article.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError('You are not authorized to delete this article');
    }

    await Article.findByIdAndRemove(req.params.articleId);
    res.status(200).send({ message: 'Article deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Invalid article ID'));
    } else {
      next(error);
    }
  }
};

module.exports = { getArticles, saveArticle, deleteArticle };
