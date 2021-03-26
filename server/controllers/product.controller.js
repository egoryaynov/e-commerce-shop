const Product = require('../models/Product')
const ErrorResponse = require('../utils/ErrorResponse')

exports.addProduct = async (req, res, next) => {
    const {name, price, discount, colors, category: categoryId, images} = req.body

    try {

    } catch (error) {
        next(error)
    }
}