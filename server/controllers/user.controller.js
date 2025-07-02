import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import {verifyJWT} from "../middlewares/verifyJWT.middleware.js";

// Function to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return { accessToken, refreshToken };
};

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
   
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser);
  newUser.refreshToken = refreshToken;
  await newUser.save();
  if (!newUser) {
    return next(new errorHandler("User registration failed", 500));
  }

  const tokenOptions = {
    httpOnly: true,
   
    sameSite: "None",
  };
   res.cookie("refreshToken", refreshToken, tokenOptions);
 console.log(req.cookies);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: newUser,
    accessToken,
    refreshToken,
  });

});


const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new errorHandler("Please fill all the fields", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  const tokenOptions = {
    httpOnly: true,
    sameSite: "None",
  };
  
  res.cookie("refreshToken", refreshToken, tokenOptions);
  
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
    accessToken,
    refreshToken,
  });
});
const logout = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  user.refreshToken = "";
  await User.updateOne({ _id: user._id }, { refreshToken: "" });

  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "None" });
  
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

const getProfile = asyncHandler(async (req, res, next) => {
 const user = req.user;
 console.log(user)
  const userId = req.user.id;
console.log(userId);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  const realUser = await User.findById(userId).select("-password -refreshToken");
console.log(realUser);
  if (!realUser) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user: realUser,
  });
});

const getOtherParticipantsProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) {
    return next(new errorHandler("User ID not provided", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  
  const getOtherParticipantsProfile = await User.find({ _id: { $ne: userId } }).select("-password -refreshToken");

  res.status(200).json({
    success: true,
    message:"Other participants' profiles retrieved successfully",
    participants: getOtherParticipantsProfile,
  });
});

export { register, login, logout, getProfile,getOtherParticipantsProfile };