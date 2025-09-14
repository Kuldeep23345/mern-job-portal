import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // Safer error handling:
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res.data.data);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.data));
          setIsApplied(
            res.data.data.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div className="max-w-7xl mx-auto my-10  md:px-0 px-10">
      <h1 className="font-bold text-xl">{singleJob?.title}</h1>
      <div className="flex md:flex-row flex-col items-start justify-between gap-3 ">
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            {singleJob?.position}Positions
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
            {singleJob?.jobType}
          </Badge>
          <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
            {singleJob?.salary}LPA
          </Badge>
        </div>
        

        
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg  ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : " cursor-pointer bg-[#7209b7] hover:bg-[#5c0993]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
     

      
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            Frontend Developer
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
