const Post = require('../models/Post');
const User = require('../models/User'); 
const sendToken = require("../utils/jwtToken");
const { sendEmail } = require("../middlewares/sendEmail");
const catchAsyncErrors = require ("../middlewares/catchAsyncErrors") ;
const crypto = require ("crypto");
const cloudinary = require("cloudinary");


exports.registerUser = catchAsyncErrors( async (req , res ,next)=> {
    /*
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "civilised_avatars",
        width: 150,
        crop: "scale",
        public_id: `${Date.now()}`,
        resource_type: "auto",
      });
    */
    const {name , email , password , avatar} = req.body;

    const user = await User.create({
        name , 
        email ,
        password ,
         avatar ,
         /*{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
         }*/
    })

    sendToken(user , 200 , res);

})