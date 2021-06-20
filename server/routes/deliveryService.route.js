const {Router} = require('express')
const router = Router()

const {sendOrder} = require('../controllers/deliveryService.controller')

// DELIVERY SERVICE
router.post('/', sendOrder)

module.exports = router