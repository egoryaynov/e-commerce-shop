const {Router} = require('express')
const router = Router()

const {createWSChannel} = require('../controllers/deliveryService.controller')

router.get('/delivery/ws', createWSChannel)

module.exports = router