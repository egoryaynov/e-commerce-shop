const {Schema, model, Types} = require('mongoose')
const Double = require('@mongoosejs/double');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const ColorSchema = new Schema({
    name: {type: String, required: [true, 'Please provide color name']},
    hex: {type: String, required: [true, 'Please provide color hex']}
}, {versionKey: false})
const CommentSchema = new Schema({
    author: {type: String, required: [true, 'Please provide author']},
    rating: {type: Number, min: 1, max: 5,  required: [true, 'Please provide rating']},
    review: String
}, {versionKey: false})

const ProductSchema = new Schema({
    name: {type: String, unique: true , required: [true, 'Please provide product name']},
    normalizedName: {type: String, unique: true, select: false},
    price: {type: Number , required: [true, 'Please provide product price']},
    discount: Number,
    rating: Double,
    colors: [ColorSchema],
    comments: [CommentSchema],
    category: {type: Types.ObjectId, ref: 'Category'},
    images: [String]
}, {versionKey: false})

ProductSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next();
    }

    this.normalizedName = this.name.toLowerCase()
    next();
});

ProductSchema.plugin(aggregatePaginate);

module.exports = model('Product', ProductSchema)