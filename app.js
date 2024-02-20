const express = require('express')
const app = express()
const {getTopics, getEndpoints} = require('./controllers/topics-controller.js')
const {getArticleById} = require('./controllers/articles-controller.js')
const { handleCustomErrors, handleOtherErrors, handleDatabaseErrors } = require('./controllers/errors-controller.js')


app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.use(handleCustomErrors)

app.use(handleDatabaseErrors)

app.use(handleOtherErrors)

module.exports = app