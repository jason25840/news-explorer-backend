const Article = require('../models/article');
const BadRequestError = require('../utils/badRequestError');
const NotFoundError = require('../utils/notFoundError');
const ForbiddenError = require('../utils/forbiddenError');
const constants = require('../utils/constants');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    return res.status(200).send(articles);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequestError(constants.INVALID_USER_ID));
    }
      return next(error);
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
    return res.status(201).send(article);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(constants.INVALID_ARTICLE_DATA));
    }
      return next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      throw new NotFoundError(constants.ARTICLE_NOT_FOUND);
    }

    if (article.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(constants.UNAUTHORIZED_ARTICLE_DELETE);
    }
    await Article.findByIdAndDelete(req.params.articleId);
    return res.status(200).send({ message: constants.ARTICLE_DELETE_SUCCESS });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequestError(constants.INVALID_ARTICLE_DATA));
    }
      return next(error);
  }
};

module.exports = { getArticles, saveArticle, deleteArticle };
