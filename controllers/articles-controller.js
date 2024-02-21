const {selectArticleById, selectArticles} = require('../models/articles-model.js')

function getArticleById(request, response, next){
    const articleId = request.params.article_id
    return selectArticleById(articleId).then((article) => {
        response.status(200).send(article[0])
    }).catch(next)
};

function getArticles(request, response, next){
    return selectArticles().then((articles) => {
        response.status(200).send(articles)
    }).catch(next)
}

module.exports = {getArticleById, getArticles}