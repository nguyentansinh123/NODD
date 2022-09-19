const User = require('../model/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Auth = (req,res,next)=>{
    let authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.json('Invalid User')
    }
    let token = authHeader.split(' ')[1]
    try {
        let payload =jwt.verify(token,process.env.JWT_SECRET)
        req.user={UserID:payload.UserID , email:payload.UserEmail}
        console.log(req.user)
        next()
    } catch (error) {
        console.log(error);
        res.json({msg:'sthg went wrong'})
    }
}

module.exports =Auth