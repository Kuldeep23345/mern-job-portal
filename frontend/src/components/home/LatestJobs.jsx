import React from "react";
import LatestJobsCard from "./LatestJobsCard";
const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <section className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]"> Latest & Top</span>{" "}
        <span>Job Openings</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {randomJobs.slice(0,6).map((job, index) => (
          <LatestJobsCard key={index}/>
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
