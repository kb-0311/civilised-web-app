const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    
    name : {
        type : String ,
        required : [true ,"Please enter your name"],
        minLength : 2,
        maxLength : 30,
    } ,

    avatar: {
        public_id: String,
        url: String,
      },

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
    }] ,


    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}) 


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
  });
  
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET , {
      expiresIn : process.env.JWT_EXPIRE ,
    });
  };
  
  userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 2 * 24 * 10 * 60 * 1000;
  
    return resetToken;
  }

module.exports = mongoose.model("User" , userSchema)