const handleCustomErrors = (err, request, response, next) => {
    if(err.status && err.msg){
        response.status(err.status).send({msg: err.msg})
    } else{
        next(err)
    }
}

const handleNonExistentId = (err, request, response, next) => {
    if(err.code === '23503'){
        response.status(404).send({msg: 'Not Found'})
    } else {
        next(err)
    }
}

const handleDatabaseErrors = (err, request, response, next) => {
    if(err.code === '22P02' || err.code === '23502'){
        response.status(400).send({msg: 'Bad Request'})
    } else {
        next(err)
    }
}

const handleOtherErrors = (err, request, response, next) => {
    console.log(err)
    response.status(500).send({msg: 'Internal Server Error'})
}

module.exports = {handleCustomErrors, handleNonExistentId, handleOtherErrors, handleDatabaseErrors}
