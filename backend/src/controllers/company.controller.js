import { Company } from "../models/company.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerCompany = asyncHandler(async (req, res) => {
  const { companyName } = req.body;

  if (!companyName) {
    throw new ApiError(400, "Company name is required");
  }

  const company = await Company.findOne({ name: companyName });
  if (company) {
    throw new ApiError(400, "you cna't register with same company");
  }

  const createCompany = await Company.create({
    name: companyName,
    userId: req.user?._id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { createCompany }, "Company registerd successfully")
    );
});

const getCompany = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const companies = await Company.find({ userId });

  if (!companies) {
    throw new ApiError(404, "Companies not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    throw new ApiError(404, "Companies not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { company }, "company by id fetched successfully")
    );
});

const updateCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;

  let logoUrl = null;

  // Upload file to cloudinary if exists
  if (req.file) {
    const fileLocalPath = req.file.path;
    const cloudinaryResult = await uploadOnCloudinary(fileLocalPath);
    logoUrl = cloudinaryResult?.secure_url;
  }

  // Build updateData object with only provided fields
  const updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (website) updateData.website = website;
  if (location) updateData.location = location;
  if (logoUrl) updateData.logo = logoUrl;

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!company) {
    throw new ApiError(404, "Company not found");
  }
 

  return res
    .status(200)
    .json(
      new ApiResponse(200, { company }, "Company updated successfully")
    );
});

export { registerCompany, getCompany, getCompanyById, updateCompany };
