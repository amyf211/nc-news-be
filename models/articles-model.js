const db = require('../db/connection')
const fs = require('fs/promises')

function selectArticleById(articleId){
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [articleId]).then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found'})
        }
        return result.rows
    });
};

function selectArticles(){
    return db.query(`SELECT articles.author, title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url,
    CAST(COUNT (comments.article_id) AS INT)
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)
    .then((result) => {
    return result.rows
    }
)};

function editVotes(articleId, newVotes) {
    console.log(articleId)
    console.log(newVotes)
    return db.query(`UPDATE articles
                     SET votes = votes + $1
                     WHERE article_id = $2
                     RETURNING *`, [newVotes, articleId])
        .then((response) => {
            if(response.rows.length === 0){
                return Promise.reject({status: 404, msg: "Not Found"})
            }
            console.log(response)
            return response.rows[0]
        })
    }


module.exports = {selectArticleById, selectArticles, editVotes}