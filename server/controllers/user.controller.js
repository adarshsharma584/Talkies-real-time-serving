import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";



const register = asyncHandler(async (req, res, next) => {

  const { fullName, username, password, gender, avatar } = req.body;

  if (!fullName || !username || !password || !gender || !avatar) {
    return next(new errorHandler("Please fill all the fields", 400));
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return next(new errorHandler("User already exists", 400));
  }

  const newUser = await User.create({
    fullName,
    username,
    password,
    gender,
    avatar,
  });

  if (!newUser) {
    return next(new errorHandler("User registration failed", 500));
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: newUser,
  });

});

export { register };