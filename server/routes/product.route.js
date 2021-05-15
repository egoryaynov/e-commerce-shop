const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const {upload} = require('../utils/imagesTools')
const router = Router()

const {
    createProduct,
    deleteProduct,
    getProducts,
    getProductById,
    uploadImages,
    createComment
} = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/:productId', getProductById)
router.post('/comment', protect, createComment)

// ADMIN ENDPOINTS
router.post('/', protect, protectAdmin, createProduct)
router.delete('/', protect, protectAdmin, deleteProduct)
router.post('/image', protect, protectAdmin, upload.array('file', 5), uploadImages)

module.exports = router