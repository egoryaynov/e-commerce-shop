const {protect} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {createCategory} = require('../controllers/category.controller')

router.post('/',protect, createCategory)

module.exports = router