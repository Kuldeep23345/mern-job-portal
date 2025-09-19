import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setSingleCompany } from "@/redux/companySlice";

import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react"; // ✅ fixed import
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loader at the beginning

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res?.data?.message);
        dispatch(setSingleCompany(res?.data?.data));
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Company setup failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  


  useEffect(() => {
    setInput({
      name: singleCompany?.company?.name || "",
      description: singleCompany?.company?.description || "",
      website: singleCompany?.company?.website || "",
      location: singleCompany?.company?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <section className="max-w-xl mx-auto my-10 px-10 md:px-0">
        <div className="flex items-center justify-between w-full gap-5 md:p-8 md:mb-0 mb-5">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-sm md:text-xl">Company Setup</h1>
        </div>
      <form onSubmit={submitHandler}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div>
            <Label  className={'text-sm md:text-base'}>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={inputHandler}
              className={'text-sm md:text-base'}
            />
          </div>
          <div>
            <Label  className={'text-sm md:text-base'}>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={inputHandler}
             className={'text-sm md:text-base'}
            />
          </div>
          <div>
            <Label  className={'text-sm md:text-base'}>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={inputHandler}
             className={'text-sm md:text-base'}
            />
          </div>
          <div>
            <Label  className={'text-sm md:text-base'}>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={inputHandler}
              className={'text-sm md:text-base'}
            />
          </div>
          <div>
            <Label className={'text-sm md:text-base'}>Logo</Label>
            <Input  className={'text-sm md:text-base'} type="file" accept="image/*" onChange={fileHandler} />
          </div>
        </div>

        {loading ? (
          <Button className="w-full mt-3" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin cursor-not-allowed" /> Please Wait
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-3 py-5 cursor-pointer">
            Save
          </Button>
        )}
      </form>
    </section>
  );
};

export default CompanySetup;
