const express = require('express')
const app =express()

app.use(express.json())


app.post('/register',(req,res)=>{
    res.json(req.body)
})


app.listen(5000,()=>{
    console.log('server is running');
})