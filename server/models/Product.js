const {Schema, model, Types} = require('mongoose')

const ColorSchema = new Schema({
    name: {type: String, required: [true, 'Please provide color name'], unique: true},
    hex: {type: String, required: [true, 'Please provide color hex'], unique: true}
}, {versionKey: false})
const CommentSchema = new Schema({
    author: {type: String, required: [true, 'Please provide author']},
    rating: {type: Number, required: [true, 'Please provide rating']},
    review: {type: String}
}, {versionKey: false})

const ProductSchema = new Schema({
    name: {type: String, unique: true , required: [true, 'Please provide product name']},
    price: {type: Number , required: [true, 'Please provide product price']},
    discount: {type: Number},
    rating: {type: Types.Decimal128, default: undefined},
    colors: [{type: ColorSchema}],
    comments: [{type: CommentSchema}],
    category: {type: Types.ObjectId, ref: 'Category'},
    images: [{type: String}]
}, {versionKey: false})

module.exports = model('Product', ProductSchema)