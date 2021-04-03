const fs = require('fs')
const path = require('path')

const Product = require('../models/Product')
const ErrorResponse = require('../utils/ErrorResponse')
const {getAggregateQuery} = require('../utils/getProductsTools')

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
exports.deleteProduct = async (req, res, next) => {
    const {productId} = req.body

    try {
        await Product.findOne({_id: productId}, async (err, doc) => {
            if (err) {
                next(new ErrorResponse('Product not found', 400))
            } else {
                doc.images.forEach(image => {
                    fs.unlinkSync(path.join(__dirname, '/../uploads/images/', image.split('/')[3]))
                })

                await doc.remove()

                res.status(200).json({
                    success: true,
                    message: 'Product removed successfully'
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.getProducts = async (req, res, next) => {
    const [aggregateQuery, aggregateSort, page, limit] = await getAggregateQuery(req)
    const options = {
        page,
        limit,
        sort: aggregateSort
    }

    try {
        const aggregatedModel = Product.aggregate(aggregateQuery)

        await Product.aggregatePaginate(aggregatedModel, options, async (err, doc) => {
            if (err || doc === null) {
                return next(new ErrorResponse('Error on load products', 404))
            } else {
                res.status(200).json({
                    success: true,
                    products: doc
                })
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.getProductById = async (req, res, next) => {
    const productId = req.params.productId

    try {
        await Product.findById(productId, (err, doc) => {
            if (err || doc === null) {
                return next(new ErrorResponse('Product doesn\'t exist', 404))
            } else {
                sendProduct(doc, 200, res)
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

exports.createComment = async (req, res, next) => {
    const {productId, rating, review} = req.body
    const user = req.user

    const author = user.firstName + ' ' + user.secondName

    try {
        const product = await Product.findById(productId)

        product.comments.push({
            author, rating
        })

        const lastCommentIdx = product.comments.length - 1

        if (review) {
            product.comments[lastCommentIdx].review = review
        }

        const totalRating = product.comments.reduce((sum, comment) => {
            return sum + comment.rating
        }, 0)

        product.rating = (totalRating / product.comments.length).toFixed(2)
        await product.save()

        res.status(201).json({
            success: true,
            comment: product.comments[lastCommentIdx]
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