import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading,setUser } from "@/redux/authSlice";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Login = () => {
  const loading = useSelector((store) => store.auth?.loading || false);
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setInputVal((prev) => ({
      ...prev,
      role: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, inputVal, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.data))
        
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
     
    } finally {
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
        className="bg-white text-gray-500 max-w-[460px] w-full mx-4 md:p-6 p-4 md:py-8  py-5 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Login
        </h2>

        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <MdOutlineEmail size="20" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={inputVal.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mt-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <MdOutlineEmail size="20" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={inputVal.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center mt-2 md:mb-8 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2 py-3">
          <RadioGroup
            value={inputVal.role}
            onValueChange={handleRoleChange}
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
        {loading ? (
          <Button className={"w-full "}>
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin cursor-not-allowed" /> Please Wait{" "}
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full mb-3transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer"
          >
            Login
          </Button>
        )}

        <p className="text-center mt-2 flex items-center justify-center gap-2">
          Don't have an Account
          <Link to={"/signup"} className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
