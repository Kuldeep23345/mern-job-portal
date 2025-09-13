import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

  const { allJobs } = useSelector((store) => store.job);
  return (
    <section className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]"> Latest & Top</span>{" "}
        <span>Job Openings</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs?.length >= 0 ? (
          allJobs
            .slice(0, 6)
            .map((job, index) => (
              <LatestJobsCard key={job.id || index} job={job} />
            ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
