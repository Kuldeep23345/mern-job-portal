import ComapaniesTable from "@/components/admin/ComapaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <section className="max-w-6xl mx-auto  md:my-10 px-10 md:px-0 ">
      <div className="flex items-center justify-between my-10 ">
        <Input
          className={"w-fit text-sm md:text-base "}
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/companies/create")} className={"text-xs md:ml-0 ml-2  md:text-base"}>
          {" "}
          New Company
        </Button>
      </div>
      <ComapaniesTable />
    </section>
  );
};

export default Companies;
