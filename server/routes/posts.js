const express = require('express');
const { createPost } = require('../controllers/posts');
const router = express.Router();

router.route('/posts/upload').post(createPost);

module.exports = router ;