import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { LocateIcon, LocationEdit, MapPin } from "lucide-react";

const LatestJobsCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)}  className="md:p-5 p-3.5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer ">
      <div>
        <h1 className="font-medium text-sm md:text-lg">{job?.company?.name}</h1>
        <span className="flex items-center mt-1  gap-0.5">

        <MapPin size={16} className="text-red-500"/>
        <p className="text-sm  text-gray-500">{job?.location}</p>
        </span>
      </div>
      <div>
        <h1 className=" font-semibold md:font-bold text-sm md:text-lg my-2">{job?.title}</h1>
        <p className="text-sm line-clamp-2 text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4"> 
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
