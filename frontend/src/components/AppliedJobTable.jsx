import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption> A list of your applied jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={"text-right"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {[1,2].map((item,index)=>{
              return  <TableRow key={index}>
                    <TableCell>9-8-2025</TableCell>
                    <TableCell>Frontend Developer</TableCell>
                    <TableCell>Google</TableCell>
                    <TableCell className={"text-right"}><Badge>Selected</Badge></TableCell>
                </TableRow>
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
