
const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {BadRequestError} = require('../errors')

const register = async(req,res)=>{
   let user = await User.create({...req.body})

    let token =  user.CreateJWT()

   res.status(StatusCodes.OK).json({user,token})
}

const login = async (req,res)=>{
    const {email , password} = req.body
    let user = await User.findOne({email})
    if(!user){
        throw new BadRequestError('No User Exist')
    }
    if(!password){
        throw new BadRequestError('Please Field in Password')
    }
    let comparePassword = await user.ComparePassword(password)
    if(!comparePassword){
        return res.json({msg:"wrong password"})
   }
   let token = user.CreateJWT()
    res.json({user , token})
}

module.exports = {
    register,
    login
}