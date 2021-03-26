const multer = require('multer')
const nanoid = require('nanoid').nanoid
const mime = require('mime-types')

const storage = multer.diskStorage({
    destination: 'uploads/images',
    filename: function (req,file,cb) {
        /* generates a "unique" name - not collision proof but unique enough for small sized applications */
        let id = nanoid()

        /* need to use the file's mimetype because the file name may not have an extension at all */
        let ext = mime.extension(file.mimetype)
        cb(null, `${id}.${ext}`)
    }
})

exports.upload = multer({storage})