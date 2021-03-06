const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/ErrorResponse')

exports.protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route'), 401)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)

        if (!user) {
            return next(new ErrorResponse('No user found with this id', 404))
        }

        req.user = user

        next()
    } catch (e) {
        next(new ErrorResponse('Not authorized to access this route'), 401)
    }
}

exports.protectAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user._id,
            role: 'Admin'
        }, (err, doc) => {
            if (err || doc === null) {
                next(new ErrorResponse('You do not have the required permissions'), 401)
            } else {
                next()
            }
        })
    } catch (e) {
        next(new ErrorResponse('You do not have the required permissions'), 401)
    }
}