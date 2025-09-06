import { Schema, model } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: Number,
      required:true
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = model("Job", jobSchema);
