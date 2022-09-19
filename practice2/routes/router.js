const express = require('express')
const router = express.Router()
const getCoolProduct = require('../controller/control')

router.get('/', getCoolProduct)

module.exports = router