const express = require('express');
const { registerUser, loginUser, logout, getAllUsers, followUser, updatePassword, updateProfile, getMyProfile, deleteMyProfile, getMyPosts, getUserPosts, forgotPassword, resetPassword } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/users/all').get(getAllUsers);
router.route('/user/follow/:id').put(isAuthenticated ,followUser);
router.route('/me/password/update').put(isAuthenticated ,updatePassword);
router.route('/me/update').put(isAuthenticated ,updateProfile);
router.route('/me').get(isAuthenticated ,getMyProfile);
router.route('/me/delete').delete(isAuthenticated ,deleteMyProfile);
router.route('/me/posts').get(isAuthenticated ,getMyPosts);
router.route('/user/posts/:id').get(isAuthenticated ,getUserPosts);
router.route('/forgot/password').post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);








module.exports = router ;