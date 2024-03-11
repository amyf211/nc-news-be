const {selectCommentsbyArticleId, addComment, getCommentbyId ,removeComment} = require('../models/comments-model.js')

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
    }).catch((err) => {
        next(err)
    })
}

function deleteComment(request, response, next){
    const commentId = request.params.comment_id
    removeComment(commentId).then(() => {
        return response.status(204).send()
    }).catch((err) => {
        next(err)
    })
}

module.exports = {getCommentsByArticleId, postComment, deleteComment}