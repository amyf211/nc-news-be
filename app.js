const express = require('express')
const app = express()
const getTopics = require('./controller.js')

app.get('/api/topics', getTopics)

app.use((error, request, response, next) => {
    response.status(500).send('server error')
})

module.exports = app