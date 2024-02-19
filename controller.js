const {selectTopics} = require('./model.js')
const endpoints = require('./endpoints.json')

function getTopics(request, response, next){
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    }).catch(next)
};

function getEndpoints(request, response, next){
    response.status(200).send({endpoints})
    .catch(next)
};

module.exports = {getTopics, getEndpoints}