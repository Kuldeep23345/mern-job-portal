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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const CompaniesTable = () => {
  useGetAllCompanies();
  const { companies } = useSelector((store) => store.company);

  // const com = [
  //   {
  //     id: 1,
  //     name: "Company Name",
  //     logo: "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_hybrid&w=740&q=80",
  //     date: "9/9/2025",
  //   },
  //   {
  //     id: 2,
  //     name: "Another Company",
  //     logo: "https://img.freepik.com/premium-vector/business-company-logo-template_61778-3.jpg",
  //     date: "9/10/2025",
  //   },
  // ];

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered com</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length == 0 ? (
            <span>You haven't register for a company</span>
          ) : (
            companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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

export default CompaniesTable;
