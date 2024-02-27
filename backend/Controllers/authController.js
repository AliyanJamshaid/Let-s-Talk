const User = require("../Models/userModel");

const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
// Register a user   => /api/v1/register
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      user,
      success: true,
    });
  }
});

// Login User  =>  /api/v1/login
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  // comparePassword is a method in UserModel
  if (user || (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      user,
      success: true,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user   =>   /api/v1/logout
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
