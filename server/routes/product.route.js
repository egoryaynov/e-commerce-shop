const {protect} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {addProduct} = require('../controllers/product.controller')

router.post('/', protect, addProduct)

module.exports = router