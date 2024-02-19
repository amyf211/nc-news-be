const { get } = require('./app.js')
const {selectTopics, selectEndpoints} = require('./model.js')

function getTopics(request, response, next){
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    }).catch(next)
};

function getEndpoints(request, response, next){
    selectEndpoints().then((endpoints) => {
        console.log(endpoints)
        response.status(200).send(endpoints)
    }).catch(next)
}

module.exports = {getTopics, getEndpoints}