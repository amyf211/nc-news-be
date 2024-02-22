const {selectCommentsbyArticleId, addComment} = require('../models/comments-model.js')

function getCommentsByArticleId(request, response, next){
    const articleId = request.params.article_id
    return selectCommentsbyArticleId(articleId).then((comments) => {
        response.status(200).send(comments)
    }).catch(next)
};

function postComment(request, response, next){
    const articleId = request.params.article_id
    addComment(articleId, request.body).then((newComment) => {
        response.status(201).send({newComment})
    })
}

module.exports = {getCommentsByArticleId, postComment}