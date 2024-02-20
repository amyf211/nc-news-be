const db = require('../db/connection')
const fs = require('fs/promises')

function selectArticleById(articleId){
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [articleId]).then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found'})
        }
        console.log(result)
        return result.rows
    });
}

module.exports = {selectArticleById}