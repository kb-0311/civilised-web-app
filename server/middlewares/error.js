const ErrorHandler = require("../utils/errorHandler");

module.exports = (err , req ,res ,next) =>{
    err.statusCode= err.statusCode || 500;
    err.message = err.message || "internal server error";

    // mongo db error
    if (err.name === "CastError") {
        const message = `post not found path : ${err.path}` ;
        err = new ErrorHandler (message , 400)
    } 
    // Mongoose dublicate key error 
    if (err.code === 11000) {
        const message = `duplicate ${Object.keys(err.keyValue)} error`
        err = new ErrorHandler (message , 400)

    }
    // Wrong JWT Token 
    if (err.name === "JsonWebTokenError") {
        const message = `json web token is invalid` ;
        err = new ErrorHandler (message , 400)
    } 
    // JWT token expire error
    if (err.name === "TokenExpiredError") {
        const message = `json web token is expired` ;
        err = new ErrorHandler (message , 400)
    } 



    res.status(err.statusCode).json({
        success : false ,
        error : err ,
        message : err.message ,
        exactError : err.stack
    })
}