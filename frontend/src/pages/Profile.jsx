import AppliedJobTable from "@/components/AppliedJobTable";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import { Contact, Mail, Pen } from "lucide-react";

import React, { useState } from "react";
import { useSelector } from "react-redux";
const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS", "NODEJS"];
const isHaveResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log(user)
  return (
    <div>
      <div className="max-w-4xl bg-white border border-gray-200 rounded-2xl my-5 p-8 mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className={"h-24 w-24"}>
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias nam ipsa reiciendis quae veniam. Consectetur quis
                quasi.
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className={"text-right"}
              variant={"outline"}
            >
              <Pen />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>

          <div>
            <h1>Skills</h1>
            <div className="flex items-center gap-3 my-2">
              {skills.length !== 0 ? (
                skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>Na</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className={"text-md font-bold"}>Resume</Label>
            {isHaveResume ? (
              <a
                target="_blank"
                href="http://google.com"
                className="text-blue-500  hover:underline w-full cursor-pointer"
              >
                Resume
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
