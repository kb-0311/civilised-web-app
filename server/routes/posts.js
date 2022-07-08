const express = require('express');
const {
    createPost,
    likeAndUnlikePost,
    deletePost,
    getPostOfFollowing,
    updateCaption,
    commentOnPost,
    deleteComment,
    getAllPosts,
  } = require("../controllers/posts");
  const { isAuthenticated } = require("../middlewares/auth");
  
  const router = express.Router();
  
  router.route("/post/upload").post(isAuthenticated, createPost);
  
  router
    .route("/post/:id")
    .get(isAuthenticated, likeAndUnlikePost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost);
  
  router.route("/posts/following").get(isAuthenticated, getPostOfFollowing);
  router.route("/posts").get(isAuthenticated, getAllPosts);

  router
    .route("/post/comment/:id")
    .put(isAuthenticated, commentOnPost)
    .delete(isAuthenticated, deleteComment);

module.exports = router ;