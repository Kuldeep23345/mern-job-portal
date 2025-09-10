import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;
  const profilePath = req.file ? req.file.path : null;
  const cloudinaryUrl = await uploadOnCloudinary(profilePath);

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
  });
  user.profile = {
    ...user.profile,
    profilePhoto: cloudinaryUrl.secure_url,
  };
  await user.save();

  // console.log(user);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account created successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
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
  if (role !== user.role) {
    throw new ApiError(400, "Account doesn't exist with current role");
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

const userUpdateProfile = asyncHandler(async (req, res) => {
  // const resumeLocalPath = req.file ? req.file.path || null
  const { fullName, email, phoneNumber, bio, skills, resume } = req.body;

  let user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let profilePath = null;
  console.log(req.file)
  if (req.file) {
    profilePath = req.file.path;
    const cloudinaryUrl = await uploadOnCloudinary(profilePath);
    if (!cloudinaryUrl || !cloudinaryUrl.secure_url) {
      throw new ApiError(500, "File upload failed");
    }
    user.profile.resume = cloudinaryUrl.secure_url;
    user.profile.resumeOriginalName=req.file.originalname
    console.log(req.file.originalName)
  }
  if (skills) {
    user.profile.skills = skills.split(",");
  }
  // updating data
  if (fullName) {
    user.fullName = fullName;
  }
  if (email) {
    user.email = email;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }
  if (bio) {
    user.profile.bio = bio;
  }

  await user.save();

  const updatedUser = await User.findById(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});
export { userRegister, userLogin, userLogout, userUpdateProfile };
