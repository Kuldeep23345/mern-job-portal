import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const searchJobHandler=()=>{
dispatch(setSearchedQuery(query))
navigate('/browse')
  }
  return (
    <section className="text-center px-10 md:px-0 -mt-8 md:-mt-0">
      <div className="flex flex-col md:gap-5 gap-2.5 my-10">
        <span className="px-4 py-1 md:py-2 md:text-base text-xs  rounded-full bg-gray-100 text-[#F83002]  font-medium mx-auto">
          No.1 Job Hunt Website
        </span>
        <h1 className="md:text-5xl text-2xl font-bold tracking-wide md:tracking-normal">
          Search,Apply & <br />
          Get your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-xs my-1 md:my-0 text-gray-700 md:text-base text-center line-clamp-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
          perspiciatis magni adipisci, illum nihil earum?
        </p>
        <div className="flex md:w-[40%] w-[70%]  shadow-xs border border-gray-200 pl-3 rounded-full items-center mx-auto md:h-12 h-7">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full h-full placeholder:text-xs md:placeholder:text-base "
            onChange={(e)=>setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className={"rounded-r-full h-full md:w-16 w-12"}>
            <Search />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
