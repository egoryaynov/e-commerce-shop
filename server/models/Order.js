const {Schema, Types, model} = require("mongoose");
const { Product, ColorSchema } = require("./Product");

const OrderProductSchema = new Schema({
    product: { type: Types.ObjectId, ref: 'Product' },
    color: ColorSchema
})
const OrderSchema = new Schema({
    status: {type: String, required: [true, 'Please inform status of Order']},
    date: {type: Date, required: [true, 'Please provide order data']},
    products: [OrderProductSchema],
    address: {type: Types.ObjectId, ref: 'Address'},
    finished: {type: Boolean, default: false},
    totalCost: Number
}, {versionKey: false})

OrderSchema.pre('save', async function (next) {
    if (!this.isModified('products')) {
        next();
    }
    
    const ids = this.products.map(function (el) {
        return Types.ObjectId(el.product)
    })

    const products = await Product.aggregate([{$match: {_id: {"$in": ids}}}])

    const reducer = (sum, product) => sum + (product.discount || product.price)
    this.totalCost = products.reduce(reducer, 0)

    next()
});

module.exports = model('Order', OrderSchema)