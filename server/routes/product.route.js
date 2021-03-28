const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const {upload} = require('../utils/imagesTools')
const router = Router()

const {createProduct, deleteProduct,  uploadImages, createComment} = require('../controllers/product.controller')

router.post('/', protect, protectAdmin,  createProduct)
router.delete('/', protect, protectAdmin, deleteProduct)

// PRODUCT IMAGES
router.post('/image', protect, protectAdmin, upload.array('file', 5), uploadImages)

// PRODUCT COMMENTS
router.post('/comment', protect, protectAdmin, createComment)

module.exports = router