const Post = require('../models/Post');
const User = require('../models/User'); 
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
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

    sendToken(user , 201 , res);

})

// Login User

exports.loginUser = catchAsyncErrors( async (req , res , next) =>{


  const {email , password} = req.body;

  // Checking if user has given email and body both 

  if (!email || !password) {
      return next(new ErrorHandler("please enter email and password both" , 400))
  }
  const user = await User.findOne({email}).select("+password").populate("posts followers following");

  if (!user) {
      return next(new ErrorHandler("invalid email or password 1 " , 401));
  }
  

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
      return next(new ErrorHandler("invalid email or password 2" , 401));
  }

  sendToken(user , 202 , res);
  
})

//logout
exports.logout = catchAsyncErrors ( async (req , res , next)=>{

  res.cookie("token" , null ,{
      expires : new Date (Date.now()),
      httpOnly : true
  })

  res.status(200).json({
      success : true ,
      message : "Logged out"
  })
})

//get all users
exports.getAllUsers = catchAsyncErrors( async (req , res)=>{
  const users = await User.find().populate("posts followers following");;
  const numberOfUsers = await User.countDocuments();

  res.status(200).json({
    success : true ,
    numberOfUsers : numberOfUsers,
    users  : users
})
})


//Get My Profile
exports.getMyProfile = catchAsyncErrors( async (req , res)=>{
  const users = await User.findById(req.user._id).populate("posts followers following");;

  res.status(200).json({
    success : true ,
    users  : users
})
})


//following a user
exports.followUser = catchAsyncErrors( async (req, res ,next) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return next(new ErrorHandler("User not found" , 401));

    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    
    return next(new ErrorHandler(error.message , 400));

  }
});

exports.updatePassword =catchAsyncErrors( async (req, res , next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please provide old and new password" , 401));
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return next(new ErrorHandler("Incorrect Old password", 401));

    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));

  }
});

exports.updateProfile =catchAsyncErrors( async (req, res ,next) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      /*
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
      */
      user.avatar.public_id = avatar.public_id;
      user.avatar.url = avatar.url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));

  }
});

//delete my profile 
exports.deleteMyProfile = catchAsyncErrors( async (req, res , next) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;
    /*
    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    */
    await user.remove();
    

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      /*
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      */
      await post.remove();
      
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});

exports.getMyPosts =catchAsyncErrors( async (req, res ,next) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.commentedByUser owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});

exports.getUserPosts =catchAsyncErrors( async (req, res ,next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 400));

      
    }

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.commentedByUser owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});


//Forgot Password Section

exports.forgotPassword =catchAsyncErrors( async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User Not Found", 400));

    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return next(new ErrorHandler(error.message, 400));

    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});

exports.resetPassword =catchAsyncErrors( async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Token is invalid or has expired", 401));

      
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));

  }
});