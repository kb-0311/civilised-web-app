const Post = require('../models/Post');
const User = require('../models/User'); 
const cloudinary = require('cloudinary');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require ("../middlewares/catchAsyncErrors") ;

exports.createPost = catchAsyncErrors( async (req, res ,next) => {
    try {
        /*
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "civilised_posts",
      });
      */
     const image = req.body.image;
      const caption = req.body.caption;
      const newPostData = {
        caption: caption,
        image: {
            public_id: image.public_id,
            url: image.secure_url,
        /*
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
          */
        },
        owner: req.user._id,
      };
  
      const post = await Post.create(newPostData);
  
      const user = await User.findById(req.user._id);
  
      user.posts.unshift(post._id);
  
      await user.save();
      res.status(201).json({
        success: true,
        message: "Post created",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 401));

    }
  });

  
  exports.deletePost =catchAsyncErrors( async (req, res ,next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));

       
      }
  
      if (post.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not Authorised", 401));

      }
      /*
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      */
      await post.remove();
  
      const user = await User.findById(req.user._id);
  
      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 501));

    }
  });
  
  exports.likeAndUnlikePost =catchAsyncErrors( async (req, res , next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));

      }
  
      if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);
  
        post.likes.splice(index, 1);
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Unliked",
          isLiked :true
        });
      } else {
        post.likes.push(req.user._id);
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Liked",
          isLiked :false
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
  
  exports.getPostOfFollowing =catchAsyncErrors( async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
  
      const posts = await Post.find({
        owner: {
          $in: user.following,
        },
      }).populate("owner likes comments.commentedByUser");
  
      res.status(200).json({
        success: true,
        posts: posts.reverse(),
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });

  exports.getAllPosts =catchAsyncErrors( async (req, res, next) => {
    try {
  
      const posts = await Post.find().populate("owner likes comments.commentedByUser");
      const totalPostCOunt = await Post.countDocuments();
      res.status(200).json({
        success: true,
        numberOfPosts :totalPostCOunt,
        posts: posts.reverse(),
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
  
  exports.updateCaption =catchAsyncErrors( async (req, res , next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return next(new ErrorHandler("Post not found", 404));

      }
  
      if (post.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("Unauthorized", 401));

      }
  
      post.caption = req.body.caption;
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post updated",
      });
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
  
  exports.commentOnPost =catchAsyncErrors( async (req, res , next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        
        return next(new ErrorHandler("Post not found", 404));


      }
  
      let commentIndex = -1;
  
      // Checking if comment already exists
  
      post.comments.forEach((item, index) => {
        console.log(item);
        console.log(item);
        if (item.commentedByUser.toString() === req.user._id.toString()) {
          commentIndex = index;
        }
      });
  
      if (commentIndex !== -1) {
        post.comments[commentIndex].comment = req.body.comment;
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Comment Updated",
        });
      } else {
        post.comments.push({
          commentedByUser: req.user._id,
          comment: req.body.comment,
        });
  
        await post.save();
        return res.status(200).json({
          success: true,
          message: "Comment added",
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message , 400));

    }
  });
  
  exports.deleteComment =catchAsyncErrors( async (req, res , next) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return next(new ErrorHandler("Post Not Found", 400));

      }
  
      // Checking If owner wants to delete
  
      if (post.owner.toString() === req.user._id.toString()) {
        const comment = await Post.findById(req.body.commentId);
        if (!comment) {
          return next(new ErrorHandler("COmment not found or already deleted", 404));
  
        }
        if (req.body.commentId === undefined) {
            return next(new ErrorHandler("Comment Id is required", 404));

        }
  
        post.comments.forEach((item, index) => {
          if (item._id.toString() === req.body.commentId.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Selected Comment has deleted",
        });
      } else {
        post.comments.forEach((item, index) => {
          if (item.user.toString() === req.user._id.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Your Comment has deleted",
        });
      }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
  });