const Article = require('../models/article');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (error) {
    next(error);
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
    console.error('Error:', error);
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.articleId,
      owner: req.user._id,
    });

    if (!article) {
      return res.status(404).send({ message: 'Article not found' });
    }

    res.send({ message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getArticles, saveArticle, deleteArticle };