const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message = err.message

    if (err.code === 11000) {
        const message = 'Duplicate Field Value Enter'
        error = new ErrorResponse(message, 400)
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    })
}

module.exports = errorHandler