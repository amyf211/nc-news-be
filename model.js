const db = require('./db/connection')
const endpointsFile = require('./endpoints.json')
const fs = require('fs/promises')

function selectTopics(){
    return db.query(`SELECT * FROM topics`).then((result) => {
        return result.rows
    })
};

function selectEndpoints(){
    fs.readFile('./endpoints.json', "utf-8").then((contents)=> {
        const body = JSON.parse(contents)
        const endpoints = JSON.stringify(body)
        console.log({endpoints})
        return {endpoints}
    })
};

module.exports = {selectTopics, selectEndpoints}