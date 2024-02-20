const {selectArticleById} = require('../models/articles-model.js')

function getArticleById(request, response, next){
    const articleId = request.params.article_id
    return selectArticleById(articleId).then((article) => {
        response.status(200).send(article[0])
    }).catch(next)
};

module.exports = {getArticleById}