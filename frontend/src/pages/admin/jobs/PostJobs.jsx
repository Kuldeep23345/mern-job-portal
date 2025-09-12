import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PostJobs = () => {
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleCompanyChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput((prevInput) => ({ ...prevInput, companyId: selectedCompany._id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", input);
  };

  return (
    <section className="flex items-center justify-center w-full my-5">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-5 w-full max-w-4xl mt-10"
      >
        {/* Title */}
        <div className="flex flex-col gap-1">
          <Label>Job Title</Label>
          <Input
            type="text"
            value={input.title}
            name="title"
            onChange={changeEventHandler}
            placeholder="Enter job title"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label>Description</Label>
          <Input
            type="text"
            value={input.description}
            name="description"
            onChange={changeEventHandler}
            placeholder="Enter job description"
          />
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-1">
          <Label>Requirements</Label>
          <Input
            type="text"
            value={input.requirements}
            name="requirements"
            onChange={changeEventHandler}
            placeholder="Enter job requirements"
          />
        </div>

        {/* Salary */}
        <div className="flex flex-col gap-1">
          <Label>Salary</Label>
          <Input
            type="text"
            value={input.salary}
            name="salary"
            onChange={changeEventHandler}
            placeholder="Enter salary (e.g. 6 LPA)"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <Label>Location</Label>
          <Input
            type="text"
            value={input.location}
            name="location"
            onChange={changeEventHandler}
            placeholder="Enter job location"
          />
        </div>

        {/* Job Type */}
        <div className="flex flex-col gap-1">
          <Label>Job Type</Label>
          <Input
            type="text"
            value={input.jobType}
            name="jobType"
            onChange={changeEventHandler}
            placeholder="e.g. Full-time, Part-time, Internship"
          />
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-1">
          <Label>Experience</Label>
          <Input
            type="text"
            value={input.experience}
            name="experience"
            onChange={changeEventHandler}
            placeholder="Enter experience required (e.g. 2 years)"
          />
        </div>

        {/* Position */}
        <div className="flex flex-col gap-1">
          <Label>Positions</Label>
          <Input
            type="number"
            value={input.position}
            name="position"
            onChange={changeEventHandler}
            placeholder="Number of openings"
          />
        </div>

        {/* Company Select */}
        <div className="flex flex-col gap-1 col-span-2">
          <Label>Company</Label>
          {companies.length > 0 ? (
            <Select onValueChange={handleCompanyChange}>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select a Company"
                  className="text-left"
                />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-xs text-red-600 font-bold">
              *Please register a company first
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <Button type="submit" className="w-full py-2">
            Post New Job
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PostJobs;
