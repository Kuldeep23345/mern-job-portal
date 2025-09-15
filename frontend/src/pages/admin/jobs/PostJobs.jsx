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
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  // Common input handler
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  // ✅ Fix: Select uses onValueChange, not e.target.value
  const handleCompanyChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name?.toLowerCase() === value.toLowerCase()
    );
    console.log(selectedCompany);
    if (selectedCompany) {
      setInput((prevInput) => ({
        ...prevInput,
        companyId: selectedCompany._id,
      }));
    }
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res?.data?.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Job post faild");
    }finally{
      setLoading(false)
    }
  };

  return (
    <section className="flex items-center justify-center w-full my-5 px-10 md:px-0">
      <form
        onSubmit={handleSubmit}
        className="grid  md:grid-cols-2 gap-5 w-full max-w-4xl mt-10"
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
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
            className={'text-xs md:text-base'}
            placeholder="Number of openings"
          />
        </div>

        {/* Company Select */}
        <div className="flex flex-col gap-1 col-span-2">
          <Label>Company</Label>
          {companies.length > 0 ? (
            <Select onValueChange={handleCompanyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company._id} value={company.name}>
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
           {loading ? (
          <Button className="w-full mt-3" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-3 cursor-pointer py-5">
            Save
          </Button>
        )}
        </div>
      </form>
    </section>
  );
};

export default PostJobs;
