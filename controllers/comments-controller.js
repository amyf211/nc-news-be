const {selectCommentsbyArticleId} = require('../models/comments-model.js')

function getCommentsByArticleId(request, response, next){
    const articleId = request.params.article_id
    return selectCommentsbyArticleId(articleId).then((comments) => {
        response.status(200).send(comments)
    }).catch(next)
};

module.exports = {getCommentsByArticleId}