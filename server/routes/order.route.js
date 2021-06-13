const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {payOrder} = require('../controllers/order.controller')

router.get('/payment', payOrder)

// ADMIN ENDPOINTS
//router.post('/', protect, protectAdmin, createProduct)

module.exports = router