const express = require('express')
const route = express.Router()

const {
    getAlljob,
    getSingleProduct,
    createJob,
    UpdateJob,
    deleteJob
} = require('../controller/ControlJobs')


route.get('/',getAlljob)
route.get('/:id',getSingleProduct)
route.post('/',createJob)
route.patch('/:id',UpdateJob)
route.delete('/:id',deleteJob)

module.exports = route