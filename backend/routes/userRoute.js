const express = require("express");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
// Normal User Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetail);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/password/update").put(isAuthenticated, updatePassword);

// Admin User Routes
router.route("/admin/users").get(isAuthenticated, authorizeRole(), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRole(), getSingleUser).put(isAuthenticated, authorizeRole(), updateUserRole).delete(isAuthenticated, authorizeRole(), deleteUser);

module.exports = router;