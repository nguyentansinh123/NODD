const express = require('express')
const app = express()
const errHandler = require('./middleware/error')
const notFound = require('./middleware/notFound')
const router = require('./routes/router')
require('dotenv').config()
const connectDB = require('./database/connect')

//middleware
app.use(express.json())
app.use('/api/v1/products' , router)
require('express-async-errors')
app.use(errHandler)
app.use(notFound)

const port = process.env.PORT || 3000


const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port , ()=>{
            console.log(`server is listenning on port ${port}`);
        })
        
    } catch (error) {
        
    }
}

start()