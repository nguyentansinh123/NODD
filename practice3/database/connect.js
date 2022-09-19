const mongoose = require('mongoose')

const connectDB =(url)=>{
    console.log('connect DB');
    mongoose.connect(url)
}

module.exports = connectDB