const Product = require('../models/Product')
const ErrorResponse = require('../utils/ErrorResponse')

exports.createProduct = async (req, res, next) => {
    const {name, price, discount, colors, category: categoryId} = req.body

    try {

    } catch (error) {
        next(error)
    }
}

exports.uploadImages = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}