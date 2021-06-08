const {Router} = require('express')
const router = Router()

const {createWSChannel} = require('../controllers/deliveryService.controller')

// DELIVERY SERVICE
router.get('/delivery/ws', createWSChannel)

module.exports = router