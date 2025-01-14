/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useApi, useApiClient } from "nextjs-django-sdk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect, use } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, MoreHorizontal, Send, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Define Zod schema for Staff
const staffSchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    profile_picture: z.string().nullable(),
    role: z.enum([
      "ADMIN",
      "TEACHER",
      "STUDENT",
      "PARENT",
      "STAFF",
      "ACCOUNTANT",
      "LIBRARIAN",
      "COUNSELOR"
    ]),
  }),
  staff_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().nullable(),
  date_of_birth: z.string(),
  gender: z.string(),
  address: z.string(),
  city: z.string(),
  region: z.string(),
  nationality: z.string(),
  email: z.string(),
  phone_number: z.string(),
  qualification: z.string(),
  experience: z.string().nullable(),
  date_joined: z.string(),
  social_security_number: z.string().nullable(),
  bank_name: z.string().nullable(),
  bank_account_number: z.string().nullable(),
  bank_branch: z.string().nullable(),
  salary: z.string(),
});
const staffListSchema = z.array(staffSchema);

type Staff = z.infer<typeof staffSchema>;

const StaffList = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(
    undefined
  );
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [genderFilter, setGenderFilter] = useState<string | undefined>(undefined);
  const [regionFilter, setRegionFilter] = useState<string | undefined>(undefined);
  const [qualificationFilter, setQualificationFilter] = useState<
    string | undefined
  >(undefined);
  const [dateJoinedFilter, setDateJoinedFilter] = useState<
    string | undefined
  >(undefined);

  const apiClient = useApiClient();
  const {
    data: staffList,
    error,
    isLoading,
    mutate,
  } = useApi<Staff[]>(
    `/api/staff/?page=${currentPage}&page_size=${pageSize}&search=${
      searchFilter || ""
    }&user__role=${roleFilter || ""}&gender=${genderFilter || ""}&region  =${
      regionFilter || ""
    }&qualification=${qualificationFilter || ""}&date_joined=${
      dateJoinedFilter || ""
    }`,
    apiClient
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  const handleFilterChange = (
    filterType:
      | "user__role"
      | "gender"
      | "region"
      | "qualification"
      | "date_joined",
    value: string | undefined
  ) => {
    switch (filterType) {
      case "user__role":
        setRoleFilter(value);
        break;
      case "gender":
        setGenderFilter(value);
        break;
      case "region":
        setRegionFilter(value);
        break;
      case "qualification":
        setQualificationFilter(value);
        break;
      case "date_joined":
        setDateJoinedFilter(value);
        break;
    }
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  const handleSearchChange = (value: string | undefined) => {
    setSearchFilter(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    mutate();
  }, [
    currentPage,
    pageSize,
    searchFilter,
    roleFilter,
    genderFilter,
    regionFilter,
    qualificationFilter,
    dateJoinedFilter,
    mutate,
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Staff/Teacher List</h2>
        <Link href={"/dashboard/admin/staff/create"}>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Create New Staff
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4 mb-4">
        {/* Search Input */}
        <Input
          placeholder="Search..."
          value={searchFilter}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-48"
        />
        {/* Role Filter */}
        <Select
          value={roleFilter}
          onValueChange={(value) => handleFilterChange("user__role", value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="TEACHER">Teacher</SelectItem>
            <SelectItem value="STAFF">Staff</SelectItem>
            {/* Add other roles as needed */}
          </SelectContent>
        </Select>

        {/* Gender Filter */}
        <Select
          value={genderFilter}
          onValueChange={(value) => handleFilterChange("gender", value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            {/* Add other genders as needed */}
          </SelectContent>
        </Select>

        {/* Region Filter */}
        <Select
          value={regionFilter}
          onValueChange={(value) => handleFilterChange("region", value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="Greater Accra">Greater Accra</SelectItem>
            <SelectItem value="Ashanti">Ashanti</SelectItem>
            {/* Add other regions as needed */}
          </SelectContent>
        </Select>

        {/* Qualification Filter */}
        <Select
          value={qualificationFilter}
          onValueChange={(value) => handleFilterChange("qualification", value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="Bachelor's Degree">
              Bachelor&apos;s Degree
            </SelectItem>
            <SelectItem value="Master's Degree">Master&apos;s Degree</SelectItem>
            <SelectItem value="Bachelor's Degree">Bachelor&apos;s Degree</SelectItem>
            {/* Add other qualifications as needed */}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Show loading skeleton
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center text-red-500">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Error loading staff list.
                </div>
              </TableCell>
            </TableRow>
          ) : staffList && staffList.length > 0 ? (
            staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.staff_id}</TableCell>
                <TableCell>{staff.first_name}</TableCell>
                <TableCell>{staff.last_name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{staff.user.role}</Badge>
                </TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phone_number}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/admin/staff/${staff.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No staff found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-2">
            Page {currentPage} of{" "}
            {staffList ? Math.ceil(staffList.length / pageSize) : 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              staffList ? currentPage >= staffList.length / pageSize : true
            }
          >
            Next
          </Button>
        </div>
        <div>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StaffList;