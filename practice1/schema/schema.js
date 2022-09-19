const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema ({
    name: {
        type: String,
        required: true,
        max: 12,
        unique: true,
        trim:true
      },
    completed: {
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('Pratice',taskSchema)