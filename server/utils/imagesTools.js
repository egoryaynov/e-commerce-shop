const multer = require('multer')
const sharp = require('sharp')
const nanoid = require('nanoid').nanoid
const mime = require('mime-types')
const Product = require('../models/Product')
const ErrorResponse = require("./ErrorResponse");

const storage = multer.memoryStorage()

const resizeImages = async (req, res, next) => {
    if (!req.files) return next()
    const {productId} = req.body

    req.body.images = []

    await Product.findById(productId, (error, doc) => {
        if (error) {
            return next(new ErrorResponse('Error on find product by id', 500))
        }

        if (doc.images.length + req.files.length > 5) {
            return next(new ErrorResponse('You can upload maximum 5 images by product', 403))
        }
    })

    await Promise.all(
        req.files.map(async file => {
            let newFilename = `${nanoid()}.${mime.extension(file.mimetype)}`

            await sharp(file.buffer)
                .resize(840, 840)
                .toFormat('jpeg')
                .jpeg({quality: 90})
                .toFile(`uploads/images/${newFilename}`)

            req.body.images.push(newFilename)
        })
    )

    next();
};

exports.upload = multer({storage})
exports.resizeImages = resizeImages