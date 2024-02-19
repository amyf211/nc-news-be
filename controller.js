const selectTopics = require('./model.js')

function getTopics(request, response, next){
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    }).catch(next)
};

function getEndpoints(request, response, next){
    selectEndpoints().then((endpoints) => {
        response.status(200).send(endpoints)
    }).catch(next)
}

module.exports = getTopics