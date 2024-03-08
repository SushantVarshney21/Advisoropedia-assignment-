import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();

    user.accessToken = accessToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generate access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullname, password } = req.body;

  const existsUser = await User.findOne({email});

  if (existsUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(500, "username or email is required");
  }

  const user = await User.findOne({email});

  if (!user) {
    throw new ApiError(500, "user does not exists");
  }

  const isPasswordVailed = await user.isPasswordCorrect(password);

  if (!isPasswordVailed) {
    throw new ApiError(500, "Invailed user credentials");
  }

  const { accessToken } = await generateAccessToken(
    user._id
  );

  const logedinUser = await User.findById(user._id).select(
    "-password -accessToken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie(accessToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: logedinUser,
          accessToken,
        },
        "user login successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { accessToken: undefined } },
    { new: true }
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, {}, "user logout successfully"));
});


const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Get User Successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  };
