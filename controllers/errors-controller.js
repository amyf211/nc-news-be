const handleCustomErrors = (err, request, response, next) => {
    if(err.status && err.msg){
        response.status(err.status).send({msg: err.msg})
    } else{
        next(err)
    }
}

const handleDatabaseErrors = (err, request, response, next) => {
    if(err.code === '22P02'){
        response.status(400).send({msg: 'Bad Request'})
    } else {
        next(err)
    }
}

const handleOtherErrors = (err, request, response, next) => {
    response.status(500).send({msg: 'Internal server Error'})
}

module.exports = {handleCustomErrors, handleOtherErrors, handleDatabaseErrors}
