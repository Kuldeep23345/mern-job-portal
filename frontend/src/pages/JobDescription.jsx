import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

const JobDescription = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl">Title</h1>
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            12 Positions
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
            Part Time
          </Badge>
          <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
            24LPA
          </Badge>
        </div>
        <Button>Apply Now</Button>
      </div>
    </div>
  );
};

export default JobDescription;
