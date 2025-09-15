import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCompany = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.data.createCompany));
        toast.success(res?.data?.message);
        const companyId = res?.data?.data?.createCompany?._id;

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-10 md:px-0">
      <div className="md:my-10 mt-10 mb-5">
        <h1 className="font-bold text-lg md:text-2xl">Your Company Name</h1>
        <p className="text-gray-500 text-sm md:text-base">
          {" "}
          What would you like to give your company name? you can change this
          later.
        </p>
      </div>
      <Label> Company Name</Label>
      <Input
        type={"text"}
        className={"my-2 md:text-base text-sm"}
        placeholder="Job Portal,Microsoft etc."
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="flex items-center gap-2 mt-5">
        <Button
          variant={"outline"}
          onClick={() => navigate("/admin/companies")}
        >
          Cancel
        </Button>
        <Button onClick={registerNewCompany}>Continue</Button>
      </div>
    </div>
  );
};

export default CreateCompany;
