const db = require('./db/connection')

function selectTopics(){
    return db.query(`SELECT * FROM topics`).then((result) => {
        return result.rows
    })
};

function selectEndpoints(){
    return db.query(`???`).then((result) => {
        return result.rows
    })
};

module.exports = selectTopics