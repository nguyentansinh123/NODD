const express = require('express')
const router = express.Router()

//import controller
const {
    getAllItems,
    createItem,
    editItem,
    getSpecificItem,
    deleteItem
} = require('../controller/control')

router.get('/', getAllItems)

router.post('/',createItem )

router.patch('/:id',editItem )

router.get('/:id', getSpecificItem)

router.delete('/:id',deleteItem )

module.exports = router