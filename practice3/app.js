require('dotenv').config()

const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const AuthRoute = require('./router/LoginAndRegister')
const JobRoute = require('./router/Jobs')
const connectDB = require('./database/connect')
const AuthMiddleWare = require('./middleware/AuthMiddleWare')

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({msg:'running'})
})


app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/jobs',AuthMiddleWare, JobRoute)

//error middleware
app.use(errorHandlerMiddleware)
app.use(notFound)



const port = process.env.PORT || 3000

const start = async()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port,()=>{
            console.log(`server is listenning on port ${port}`);
        })
    } catch (error) {
        
    }
}

start()