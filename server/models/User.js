const crypto = require('crypto')
const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a First name']
    },
    secondName: {
        type: String,
        required: [true, 'Please provide a Second name']
    },
    middleName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        match: [
            /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
            'Please provide correct password'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: 6,
        select: false
    },
    addresses: [{type: Schema.Types.ObjectId, ref: 'Address'}],

    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {versionKey: false})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.methods.getSignedToken = async function (password) {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + process.env.RESET_PASSWORD_EXPIRE * (60 * 1000)

    return resetToken
}

module.exports = model('User', UserSchema)