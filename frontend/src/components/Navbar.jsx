import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  return (
    <nav className="flex items-center justify-between max-w-7xl w-full  mx-auto px-10 py-5">
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
            <Button variant="outline" className="cursor-pointer py-5">
              Login
            </Button>
            <Button
              variant="outline"
              className="bg-[#6A38C2] hover:bg-[#5719c3] hover:text-white text-white cursor-pointer py-5 "
            >
              Signup
            </Button>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="max-w-72 mr-5 md:mr-0">
              <div className="flex items-center gap-2 -mt-6">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div className="ml-2 mt-8">
                  <h2 className="font-medium text-sm">KunalRajput</h2>
                  <h4 className="font-normal text-sm text-gray-400">
                    Lorem, ipsum dolor.
                  </h4>
                </div>
              </div>
              <div className="flex items-center  gap-8">
                <Button variant="link">View profile</Button>
                <Button variant="link">Logout</Button>
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
