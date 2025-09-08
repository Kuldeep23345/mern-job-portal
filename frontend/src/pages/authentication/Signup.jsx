import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FiPhoneCall } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios, { AxiosHeaders } from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate()
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
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("profile", input.profile);
    }
    
  

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
      )
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <form
        className="bg-white text-gray-500 max-w-[460px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Sign Up
        </h2>

        {/* fullName */}
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <LuUser size="20" />
          <input
            name="fullName"
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="fullName"
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
            placeholder="Phonenumber"
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
            onValueChange={(value) => setInput((prev) => ({ ...prev, role: value }))}
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
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-3 pl-2">
          <label
            htmlFor="file"
            className="flex items-center justify-center gap-0.5"
          >
            <CgProfile size={"20"} />
            Profile
          </label>
          <input
            id="file"
            name="file"
            className="w-full outline-none bg-transparent py-2.5"
            type="file"
            accept="image/*"
            // required
            onChange={fileHandler}
          />
        </div>

        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          Sign Up
        </button>

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
