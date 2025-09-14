import Job from "@/components/jobs/Job";
import React from "react";
import { useSelector } from "react-redux";
const randomJobs = [1, 2, 3];

const Browse = () => {
  const {allJobs} = useSelector(store=>store.job)
  console.log(allJobs)
  return (
    <div className="max-w-7xl mx-auto my-10 px-10 md:px-0">
      <h1 className="font-bold text-xl my-10">
        Search Results {allJobs?.length}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {allJobs?.map((job) => (
          <Job key={job?._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
