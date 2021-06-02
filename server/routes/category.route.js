const {protect, protectAdmin} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {createCategory, getCategories, deleteCategory} = require('../controllers/category.controller')

router.get('/', getCategories)
router.post('/', protect, protectAdmin, createCategory)
router.delete('/', protect, protectAdmin, deleteCategory)

module.exports = router