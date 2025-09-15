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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  // ✅ safely filter jobs
  const filterJobs = allAdminJobs.filter((job) => {
    if (!searchJobByText) return true;
    const text = searchJobByText.toLowerCase();
    return (
      job?.title?.toLowerCase().includes(text) ||
      job?.company?.name?.toLowerCase().includes(text)
    );
  });

  return (
    <div >
      <Table>
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow className='text-xs md:text-base'>
            <TableHead >Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id} className={'text-xs md:text-base'}>
                <TableCell>{job.company?.name || "N/A"}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  {job.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer hover:text-blue-600"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2 ">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
