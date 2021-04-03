const {Router} = require('express')
const router = Router()

const {
    register,
    login,
    adminLogin,
    forgotPassword,
    resetPassword,
    verifyAdminToken
} = require('../controllers/auth.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

router.post('/admin/login', adminLogin)
router.post('/admin/verify', verifyAdminToken)

module.exports = router