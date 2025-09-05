import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, role, profile } = req.body;

  if (!fullName || !email || !password || !phoneNumber || !role) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(
      400,
      "User already existed with this email and password"
    );
  }

  const user = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    role,
    profile,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account created successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
 
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid credentials");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  const token = await user.generateAccessToken();

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "Login Successfully"));
});

const userLogout = asyncHandler(async (_, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .clearCookie("token", options)
    .status(200)
    .json(new ApiResponse(200, {}, "Logout Successfully"));
});
export { userRegister, userLogin, userLogout };
