const {Router} = require('express')
const router = Router()

const {
    register,
    login,
    loginAdmin,
    forgotPassword,
    resetPassword,
    tokenVerify
} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

router.post('/login/admin', loginAdmin)

router.post('/token/verify', tokenVerify)

module.exports = router