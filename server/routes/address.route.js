const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware/auth.middleware')

const {createAddress, deleteAddress} = require('../controllers/address.controller')

router.post('/', protect, createAddress)
router.delete('/', protect, deleteAddress)

module.exports = router