const express = require('express')
const app = express()
const router = require('./routes/router')
const connectDB = require('./database/connect')


require('dotenv').config()

//body parser
app.use(express.json())
//router
app.use('/api/v1/tasks', router)



app.get('/', (req, res) => {
    res.send('hello world')
})

const port = process.env.PORT 

const start = async (req,res) => {
    try {
        //connect to db
        await connectDB(process.env.MONGODB_URL)

        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        res.json({success:false,msg:'server is having an error at this point'})
    }
}
start()