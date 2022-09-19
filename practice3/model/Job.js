const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please enter company name'],
        minLength:3,
        maxLength:40
    },
    position:{
        type:String,
        required:[true,'please enter position name'],
        minLength:3,
        maxLength:40
    },
    status:{
        type: String,
        enum: ['interview' , 'declined','pending'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true , 'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Jobs', JobSchema)