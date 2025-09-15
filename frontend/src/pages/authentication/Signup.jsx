import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FiPhoneCall } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const {loading,user} = useSelector((store) => store.auth);
  const dispatch = useDispatch()
 

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    profile: null,
  });

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const fileHandler = (e) => {
    setInput((prev) => ({ ...prev, profile: e.target.files?.[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(setLoading(true));
    

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.profile) {
      formData.append("profile", input.profile);
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }finally{
       dispatch(setLoading(false));
    }
  };
useEffect(()=>{
  if(user){
    navigate('/')
  }
},[])
  return (
    <section className="h-[80vh] w-full flex items-center justify-center">
      <form
        className="bg-white text-gray-500 max-w-[460px] w-full mx-4 md:p-6 p-4 md:py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold md:mb-9 mb-4 text-center text-gray-800">
          Sign Up
        </h2>

        {/* Full Name */}
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <LuUser size="20" />
          <input
            name="fullName"
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="Full Name"
            required
            value={input.fullName}
            onChange={inputHandler}
          />
        </div>

        {/* Email */}
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <MdOutlineEmail size="20" />
          <input
            name="email"
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            placeholder="Email"
            required
            value={input.email}
            onChange={inputHandler}
          />
        </div>

        {/* Phone */}
        <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <FiPhoneCall size="20" />
          <input
            name="phoneNumber"
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="Phone number"
            required
            value={input.phoneNumber}
            onChange={inputHandler}
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <MdOutlineEmail size="20" />
          <input
            name="password"
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            placeholder="Password"
            required
            value={input.password}
            onChange={inputHandler}
          />
        </div>

        {/* Role RadioGroup */}
        <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 py-3">
          <RadioGroup
            value={input.role}
            onValueChange={(value) =>
              setInput((prev) => ({ ...prev, role: value }))
            }
            className={"flex items-center justify-center"}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="student" id="r1" />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="recruiter" id="r2" />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>

        {/* File input */}
        <div className="flex items-center mt-2 mb-3 md:mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-3 pl-2">
          <label
            htmlFor="profile"
            className="flex items-center justify-center gap-0.5"
          >
            <CgProfile size={"20"} />
            Profile
          </label>
          <input
            id="profile"
            name="profile"
            className="w-full outline-none bg-transparent py-2. cursor-pointer"
            type="file"
            accept="image/*"
            onChange={fileHandler}
          />
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button disabled className={"w-full cursor-not-allowed"}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full mb-3 transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer"
          >
            Sign Up
          </Button>
        )}

        {/* Redirect to Login */}
        <p className="text-center flex items-center justify-center gap-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
