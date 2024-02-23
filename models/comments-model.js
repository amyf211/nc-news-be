const db = require('../db/connection')
const fs = require('fs/promises')

function selectCommentsbyArticleId(articleId){
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId]).then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found'})
        }
        return result.rows
    });
};

function addComment(articleId, newComment){

   return db.query(`INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`, [articleId, newComment.username, newComment.body])

   .then((comment) => {
    return comment.rows[0]
   })
}

module.exports = {selectCommentsbyArticleId, addComment}