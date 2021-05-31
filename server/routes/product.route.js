const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const {upload, resizeImages} = require('../utils/imagesTools')
const router = Router()

const {
    createProduct,
    deleteProduct,
    getProducts,
    getProductById,
    uploadImages,
    createComment,
    editProduct
} = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/:productId', getProductById)
router.post('/comment', protect, createComment)

// ADMIN ENDPOINTS
router.post('/', protect, protectAdmin, createProduct)
router.delete('/', protect, protectAdmin, deleteProduct)
router.put('/', protect, protectAdmin, editProduct)
router.post('/image', protect, protectAdmin, upload.array('file', 5), resizeImages, uploadImages)

module.exports = router