const multer = require('multer')
const nanoid = require('nanoid').nanoid
const mime = require('mime-types')

const storage = multer.diskStorage({
    destination: 'uploads/images',
    filename: function (req,file,cb) {
        let id = nanoid()

        let ext = mime.extension(file.mimetype)
        cb(null, `${id}.${ext}`)
    }
})

exports.upload = multer({storage})