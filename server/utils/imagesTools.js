const multer = require('multer')
const sharp = require('sharp')
const nanoid = require('nanoid').nanoid
const mime = require('mime-types')

const storage = multer.memoryStorage()

const resizeImages = async (req, res, next) => {
    console.log('work!!!!!!!!!!!!')
    if (!req.files) return next()

    req.body.images = []
    await Promise.all(
        req.files.map(async file => {
            let newFilename = `${nanoid()}.${mime.extension(file.mimetype)}`
            console.log(newFilename)

            await sharp(file.buffer)
                .resize(840, 840)
                .toFormat(mime.extension(file.mimetype))
                .jpeg({quality: 90})
                .toFile(`uploads/images/${newFilename}`)

            req.body.images.push(newFilename)
        })
    );

    console.log(req.body.images)

    next();
};

exports.upload = multer({storage})
exports.resizeImages = resizeImages