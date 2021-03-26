const {Schema, model, Types} = require('mongoose')

const CategorySchema = new Schema({
    name: {type: String, required: [true, 'Please provide category name']}
}, {versionKey: false})

module.exports = model('Category', CategorySchema)