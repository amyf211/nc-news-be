const {selectUsers} = require('../models/users-model.js')

function getUsers(request, response, next){
    selectUsers().then((topics) => {
        response.status(200).send(topics)
    }).catch(next)
};

module.exports = {getUsers}