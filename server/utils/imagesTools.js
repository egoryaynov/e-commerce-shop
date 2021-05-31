const multer = require('multer')
const sharp = require('sharp')
const nanoid = require('nanoid').nanoid
const mime = require('mime-types')

const storage = multer.memoryStorage()

const resizeImages = async (req, res, next) => {
    if (!req.files) return next()

    req.body.images = []
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
    );

    next();
};

exports.upload = multer({storage})
exports.resizeImages = resizeImages