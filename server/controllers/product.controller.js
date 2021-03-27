const Product = require('../models/Product')
const ErrorResponse = require('../utils/ErrorResponse')

exports.createProduct = async (req, res, next) => {
    const {name, price, discount, colors, categoryId: category} = req.body

    try {
        const product = new Product({
            name, price, colors, category
        })

        if (discount) {
            product.discount = discount
        }

        await product.save(async err => {
            if (err) {
                next(new ErrorResponse(err.message, 500))
            } else {
                await sendProduct(product, 201, res)
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.uploadImages = async (req, res, next) => {
    const {productId} = req.body

    try {
        const product = await Product.findById(productId)
        if (!product.images) {
            product.images = []
        }

        req.files.forEach(file => {
            product.images.push(process.env.BASE_UPLOAD_URL + file.filename)
        })

        await product.save(async err => {
            if (err) {
                next(new ErrorResponse(err.message, 500))
            } else {
                await sendProduct(product, 201, res)
            }
        })
    } catch (error) {
        next(error)
    }
}

const sendProduct = async (product, statusCode, res) => {
    const populatedProduct = await Product.findById(product._id)
        .populate('category')

    res.status(statusCode).json({
        success: true,
        product: populatedProduct
    })
}