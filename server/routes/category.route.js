const {protect} = require("../middleware/auth.middleware");
const {Router} = require('express')
const router = Router()

const {addCategory} = require('../controllers/category.controller')

router.post('/',protect, addCategory)

module.exports = router