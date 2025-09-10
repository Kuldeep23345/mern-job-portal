import FilterCard from "@/components/jobs/FilterCard";
import Job from "@/components/jobs/Job";
import React from "react";
import { useSelector } from "react-redux";
// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
    <main>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className=" grid grid-cols-2 gap-4">
                {allJobs?.map((job, index) => (
                  <div key={index}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Jobs;
