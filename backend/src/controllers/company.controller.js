import { Company } from "../models/company.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    .json(new ApiResponse(200, createCompany, "Company created successfully"));
});

const getCompany = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const companies = await Company.find({ userId });
  console.log(companies);
  if (!companies) {
    throw new ApiError(404, "Companies not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies fetched successfully"));
});

const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);
  console.log(company);
  if (!company) {
    throw new ApiError(404, "Companies not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, company, "company by id fetched successfully"));
});

const updateCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;
  // Remove undefined fields from updateData
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (website !== undefined) updateData.website = website;
  if (location !== undefined) updateData.location = location;

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!company) {
    throw new ApiError(404, "company not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, company, "company updated successfully"));
});
export { registerCompany, getCompany, getCompanyById, updateCompany };
