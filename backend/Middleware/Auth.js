const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[0];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});
