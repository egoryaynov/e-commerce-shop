const jwt = require('jsonwebtoken')

const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

exports.getUserInfo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('addresses')
            .populate('orders')
            
        res.status(200).json({ success: true, user })
    } catch (error) {
        next(error)
    }
}
exports.register = async (req, res, next) => {
    const {firstName, secondName, middleName, email, password} = req.body

    try {
        const user = await User.create({
            firstName, secondName, middleName, email, password
        })

        await sendSignedToken(user, 201, res)
    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400))
    }

    try {
        const user = await User.findOne({email}).select("+password")

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        await sendSignedToken(user, 200, res)
    } catch (error) {
        next(error)
    }
}
exports.adminLogin = async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400))
    }

    try {
        const user = await User.findOne({
            email,
            role: 'Admin'
        }).select("+password")

        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401))
        }

        await sendSignedToken(user, 200, res)
    } catch (error) {
        next(error)
    }
}

exports.forgotPassword = async (req, res, next) => {
    const {email} = req.body

    try {
        const user = await User.findOne({email})

        if (!user) {
            return next(new ErrorResponse('Email could not be sent', 404))
        }

        const resetToken = await user.getResetPasswordToken()

        await user.save()

        const resetUrl = `http://localhost:5000/resetpassword/${resetToken}`

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl}>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password reset request',
                text: message
            })

            res.status(200).json({success: true, data: 'Email sent'})
        } catch (e) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()

            return next(new ErrorResponse('Email could not be send', 500))
        }
    } catch (e) {
        next(e)
    }
}
exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })

        if (!user) {
            return next(new ErrorResponse('Invalid reset token', 400))
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        res.status(201).json({
            success: true,
            message: 'Password Reset Success'
        })
    } catch (e) {
        next(e)
    }
}

exports.verifyAdminToken = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    try {
        if (!token) {
            return next(new ErrorResponse('Please provide JWT token', 404))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        await User.find({
            _id: decoded.userId,
            role: 'Admin'
        }, (err, doc) => {
            if (err || !doc) {
                res.status(401).json({
                    success: false,
                    message: 'Access denied'
                })
            } else {
                res.status(200).json({
                    success: true,
                    token
                })
            }
        })
    } catch (e) {
        next(e)
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find()
    
    if (users) return res.status(200).json({
        success: true,
        users
    })
}

const sendSignedToken = async (user, statusCode, res) => {
    const token = await user.getSignedToken()
    res.status(statusCode).json({success: true, token})
}