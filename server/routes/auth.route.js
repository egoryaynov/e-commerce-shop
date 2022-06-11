const {Router} = require('express')
const router = Router()

const {
    register,
    login,
    adminLogin,
    forgotPassword,
    resetPassword,
    verifyAdminToken,
    getUsers, 
    getUserInfo
} = require('../controllers/auth.controller')

const {protect, protectAdmin} = require("../middleware/auth.middleware");

router.get('/', protect, getUserInfo)
router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

router.post('/admin/login', adminLogin)
router.post('/admin/verify', verifyAdminToken)

// ADMIN ENDPOINTS
router.get('/users', protect, protectAdmin, getUsers)

module.exports = router