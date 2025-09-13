import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const postJob = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    position,
    companyId,
    experience,
  } = req.body;
  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !position ||
    !companyId ||
    !experience
  ) {
    throw new ApiError(400, "Something is missing");
  }
  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(","),
    salary: Number(salary),
    location,
    jobType,
    experienceLevel: experience,
    position,
    company: companyId,
    created_by: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, job, "New Job created successfully"));
});

const getAllJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  };

  const jobs = await Job.find(query)
    .populate({ path: "company" })
    .sort({ createdAt: -1 });
  if (!jobs) {
    throw new ApiError(404, "Jobs not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate({
    path:'applications'
  })
  if (!job) {
    throw new ApiError(404, "Job not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"));
});

const getAdminJobs = asyncHandler(async (req, res) => {
  const adminId = req.user?._id;

  const jobs = await Job.find({ created_by: adminId }).populate("company", "name");
  if (!jobs) {
    throw new ApiError(404, "Jobs are not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Job fetched successfully"));
});

export { postJob, getAllJobs, getJobById, getAdminJobs };
