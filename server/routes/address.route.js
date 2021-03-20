const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware/auth.middleware')

const {createAddress, deleteAddress, updateAddress} = require('../controllers/address.controller')

router.post('/', protect, createAddress)
router.delete('/', protect, deleteAddress)
router.put('/', protect, updateAddress)

module.exports = router