const db = require('./db/connection')
const fs = require('fs/promises')

function selectTopics(){
    return db.query(`SELECT * FROM topics`).then((result) => {
        return result.rows
    })
};

module.exports = {selectTopics}