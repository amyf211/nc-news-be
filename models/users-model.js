const db = require('../db/connection')
const fs = require('fs/promises')

function selectUsers(){
    return db.query(`SELECT * FROM users`).then((result) => {
        return result.rows
    })
};

module.exports = {selectUsers}