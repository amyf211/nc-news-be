const selectTopics = require('./model.js')

function getTopics(request, response, next){
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    }).catch(next)
};

module.exports = getTopics