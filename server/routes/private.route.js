const {getPrivateData} = require("../controllers/private.controller");
const {Router} = require('express')
const {protect} = require('../middleware/auth.middleware')
const router = Router()

router.get('/', protect, getPrivateData)

module.exports = router