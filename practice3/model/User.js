const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please fill in Your name'],
        minLength:3,
        maxLength:12
    },
    email:{
        type:String,
        required:[true,'Please fill in Your email'],
        minLength:3,
        maxLength:30,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Invalid Email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please fill in Your password'],
        minLength:6
    },
})

UserSchema.methods.CreateJWT =function(){

    return jwt.sign({UserID:this._id, UserEmail:this.email},process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFE})

}
UserSchema.methods.ComparePassword = async function(e){
    let isMatch = await bcrypt.compare(e,this.password)
    return isMatch
}

UserSchema.pre('save',function(next){
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next()
})

module.exports = mongoose.model('Users' , UserSchema)