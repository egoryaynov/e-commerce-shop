const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        match: [
            /[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*/,
            'Please provide correct username'
        ]
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
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

module.exports = model('User', UserSchema)