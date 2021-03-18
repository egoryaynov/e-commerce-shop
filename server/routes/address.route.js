const {Router} = require('express')
const router = Router()
const {protect} = require('../middleware/auth.middleware')

const {setAddress} = require('../controllers/address.controller')

router.post('/', protect, setAddress)

module.exports = router