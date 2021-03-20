const {Schema, model} = require('mongoose')

const AddressSchema = new Schema({
    street: {
        type: String,
        required: [true, 'Please provide a street']
    },
    houseNumber: {
        type: String,
        required: [true, 'Please provide a number of house']
    },
    apartmentNumber: {
        type: String,
        required: [true, 'Please provide a number of apartment']
    },
    city: {
        type: String,
        required: [true, 'Please provide a city']
    },
    country: {
        type: String,
        required: [true, 'Please provide a country']
    },
    postcode: {
        type: String,
        required: [true, 'Please provide a postcode']
    },
    full: {
        type: String
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {versionKey: false})

module.exports = model('Address', AddressSchema)