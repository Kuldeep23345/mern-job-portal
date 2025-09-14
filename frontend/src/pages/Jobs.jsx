import FilterCard from "@/components/jobs/FilterCard";
import Job from "@/components/jobs/Job";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdMenu } from "react-icons/md";
import { CgClose } from "react-icons/cg";
// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const [hamBurger, setHamBurger] = useState(false);
  const hamBurgerHandler = () => {
    setHamBurger((prev) => !prev);
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto md:mt-5 px-10">
        <div className="flex items-center  gap-2 relative md:hidden">
          <MdMenu onClick={hamBurgerHandler} className="size-6 mb-4" />
          <span className="-mt-3">Filter</span>
        </div>
        <div className="flex gap-5 ">
          {
            hamBurger&&(
              <div className="fixed left-0 bottom-0 right-0 top-0 z-10 bg-white h-screen w-[70%] pl-12 pt-16">
                <CgClose className="absolute right-3 " onClick={hamBurgerHandler}/>
                <FilterCard hamBurgerHandler={hamBurgerHandler}/>
              </div>
            )
          }
          <div className="md:w-[20%] hidden md:flex">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                {filterJobs?.map((job, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={index}
                  >
                    <Job job={job} />
                  </motion.div>
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
