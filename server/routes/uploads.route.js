const {Router} = require('express')
const router = Router()

const {getImage} = require('../controllers/upload.controller')

router.get('/images/:filename', getImage)

module.exports = router