const {Router} = require('express')
const router = Router()

const {sendOrders} = require('../controllers/deliveryService.controller')

// DELIVERY SERVICE
router.post('/', sendOrders)

module.exports = router