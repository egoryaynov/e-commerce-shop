const {Schema, model} = require('mongoose')

const AddressSchema = new Schema({
    street: {type: String, required: [true, 'Please provide a street']},
    houseNumber: {type: String, required: [true, 'Please provide a number of house']},
    apartmentNumber: {type: String, required: [true, 'Please provide a number of apartment']},
    city: {type: String, required: [true, 'Please provide a city']},
    country: {type: String, required: [true, 'Please provide a country']},
    postcode: {type: String, required: [true, 'Please provide a postcode']},
    full: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User', select: false}
}, {versionKey: false})

module.exports.getFullAddress = function (address) {
    return `${address.street}, ${address.houseNumber}, ${address.apartmentNumber}, ${address.city}, ${address.country}, ${address.postcode}`
}

module.exports.Address = model('Address', AddressSchema)