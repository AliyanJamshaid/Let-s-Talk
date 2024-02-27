const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  logout,
} = require("../Controllers/authController");

// const { isAuthenticatedUser } = require("../Middleware/Auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(getUserProfile);
router.route("/logout").post(logout);

module.exports = router;
