const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {payOrder, getAllOrders} = require('../controllers/order.controller')

router.post('/payment', protect, payOrder)

// ADMIN ENDPOINTS
router.get('/', protect, protectAdmin, getAllOrders)

module.exports = router