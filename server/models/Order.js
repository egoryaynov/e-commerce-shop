const {Schema, Types, model} = require("mongoose")

const OrderSchema = new Schema({
    status: {type: String, required: [true, 'Please inform status of Order']},
    products: [{type: Types.ObjectId, ref: 'Product'}],
    address: {type: Types.ObjectId, ref: 'Address'},
    totalCost: Number
}, {versionKey: false})

OrderSchema.pre('save', async (next) => {
    if (!this.isModified('totalCost')) {
        next();
    }

    this.totalCost = await this.populate('products')
        .reduce((sum, product) => sum + (product.discount || product.price))

    next();
});

module.exports = model('Order', OrderSchema)