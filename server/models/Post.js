const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    caption : {
        type : String,
        maxLength: 250
    } ,

    image : {
        public_id : {
            type : String
        } ,
        url : {
            type : String
        }
    } ,

    owner : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
    } ,

    createdAt : {
        type : Date ,
        required : true ,
        default : Date.now(),
    } ,

    likes : [{
        
            type :mongoose.Schema.Types.ObjectId,
            ref : "User",
        

    }] ,

    comments : [{
        commentedByUser : {
            type :mongoose.Schema.Types.ObjectId,
            ref : "User",
        } ,
        
        comment : {
            type : String,
            required : true
        }
    }]


}) 

module.exports = mongoose.model("Post" , postSchema)