const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {createCategory, getCategories, deleteCategory, changeCategory} = require('../controllers/category.controller')

router.get('/', getCategories)

// ADMIN ROUTES
router.post('/', protect, protectAdmin, createCategory)
router.put('/', protect, protectAdmin, changeCategory)
router.delete('/', protect, protectAdmin, deleteCategory)

module.exports = router