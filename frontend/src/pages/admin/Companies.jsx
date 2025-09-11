import ComapaniesTable from "@/components/admin/ComapaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
    const navigate = useNavigate()
  return (
    <section className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-10">
        <Input className={"w-fit "} placeholder="Filter by name" />
        <Button onClick={()=> navigate('/admin/companies/create')}> New Company</Button>
      </div>
      <ComapaniesTable />
    </section>
  );
};

export default Companies;
