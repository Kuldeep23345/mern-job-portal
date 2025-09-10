import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
     toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="flex items-center justify-between max-w-7xl w-full  mx-auto  py-5">
      {/* logo */}
      <div className="font-medium text-2xl">
        Job <span className="text-red-500 font-semibold">Portal</span>
      </div>
      {/* links */}
      <div className="flex items-center justify-center gap-5 ">
        <ul className="flex items-center gap-5">
          {["/Home", "/Jobs", "/Browse"].map((link, index) => (
            <li key={index}>
              <Link
                className="text-base font-medium"
                to={link.toLowerCase().replace("/home", "/")}
              >
                {link.replace("/", "")}
              </Link>
            </li>
          ))}
        </ul>

        {/* avatar */}

        {!user ? (
          <div className="flex flex-row gap-2">
            <Link to={"/login"}>
              <Button variant="outline" className="cursor-pointer py-5">
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                variant="outline"
                className="bg-[#6A38C2] hover:bg-[#5719c3] hover:text-white text-white cursor-pointer py-5 "
              >
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer w-10 h-10">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="max-w-72 mr-5 md:mr-0">
              <div className="flex items-center gap-2 -mt-6">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
                <div className="ml-2 mt-8">
                  <h2 className="font-medium text-sm">{user?.fullName}</h2>
                  <h4 className="font-normal text-sm text-gray-400">
                    {user?.profile?.bio}
                  </h4>
                </div>
              </div>
              <div className="flex items-center  gap-8">
                <Link to={"/profile"}>
                  <Button variant="link">View profile</Button>
                </Link>
                <Button onClick={logoutHandle} variant="link">
                  Logout
                </Button>
              </div>
            </PopoverContent>
            {/* <h2 className="-ml-3"></h2> */}
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
