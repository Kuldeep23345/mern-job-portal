import AdminJobsTable from "@/components/admin/AdminJobsTable";
import ComapaniesTable from "@/components/admin/ComapaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

import { setSearchCompanyByText } from "@/redux/companySlice";
import { setSearchJobByText } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <section className="max-w-6xl mx-auto my-10 px-10 md:px-0">
      <div className="flex items-center justify-between my-10">
        <Input
          className={"w-fit text-xs md:text-base"}
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/jobs/create")} className={'text-xs md:text-base ml-3 md:ml-0 cursor-pointer'}>
          {" "}
          New Jobs
        </Button>
      </div>
      <AdminJobsTable />
    </section>
  );
};

export default AdminJobs;
