function globalErrorHandler(error, request, response, next) {
    if (!error) return next()
    console.log('Error: ', error)
    response.status(error.statusCode || 500).send({
        error: error.name || 'General error',
        message: error.message || 'Contact engineering team'
    })
}

module.exports = globalErrorHandler
