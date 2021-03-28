const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {createCategory} = require('../controllers/category.controller')

router.post('/', protect, protectAdmin, createCategory)

module.exports = router