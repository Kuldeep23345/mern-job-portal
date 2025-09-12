import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { PopoverContent } from "../ui/popover";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status,id) => {
    try {
        const res= await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true})
        if(res.data.success){
          toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "status faild");
    }
    
  }

  return (
    <section>
      <Table>
        <TableCaption> A list of your applied user </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, index) => (
              <tr key={index}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>+91 {item?.applicant?.phoneNumber}</TableCell>
                <TableCell >
                  {item?.applicant?.profile?.resume ? (
                    <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank">
                      {" "}
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ):(<span>NA</span>)}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className={"float-right cursor-pointer"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className={"w-32"}>
                      {shortListingStatus.map((status, index) => (
                        <div
                        onClick={()=>statusHandler(status,item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ApplicantsTable;
