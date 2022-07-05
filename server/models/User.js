const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name : {
        type : String ,
        required : [true ,"Please enter your name"],
        minLength : 2,
        maxLength : 30,
    } ,

    email : {
        type : String ,
        required : [true ,"Please enter your email"] ,
        unique : [true , "this email is already registered"],


    } ,

    password : {
        type :String ,
        required : [true , "Please Enter the password"],
        minLength : [6 , 'Password is weak , please input a password longer password'],

    } ,

    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }] ,

    followers :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }] ,

    following :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]



}) 

module.exports = mongoose.model("User" , userSchema)