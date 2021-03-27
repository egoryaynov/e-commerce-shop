const {protect} = require("../middleware/auth.middleware");
const {Router} = require('express')
const {upload} = require('../utils/imagesTools')
const router = Router()

const {createProduct, deleteProduct,  uploadImages} = require('../controllers/product.controller')

router.post('/', protect, createProduct)
router.delete('/', protect, deleteProduct)

router.post('/images', protect, upload.array('file', 5), uploadImages)

module.exports = router