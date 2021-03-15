const {Router} = require('express')
const router = Router()

const {register, login, forgotPassword, resetPassword} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

module.exports = router