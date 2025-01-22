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
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, User } from "lucide-react";
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
import { format } from "date-fns";

const studentSchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    profile_picture: z.string().nullable(),
  }),
  student_id: z.string(),
  parent: z.string().nullable(),
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
  phone_number: z.string().nullable(),
  admission_number: z.string().nullable(),
  admission_date: z.string().nullable(),
  emergency_contact_name: z.string(),
  emergency_contact_phone: z.string(),
  emergency_contact_relationship: z.string(),
  medical_conditions: z.string().nullable(),
  allergies: z.string().nullable(),
  previous_school_name: z.string().nullable(),
  previous_school_address: z.string().nullable(),
  previous_school_contact: z.string().nullable(),
  religion: z.string().nullable(),
  denomination: z.string().nullable(),
});

const studentListSchema = z.array(studentSchema);

type Student = z.infer<typeof studentSchema>;

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(
    undefined
  );
  const [genderFilter, setGenderFilter] = useState<string | undefined>(
    undefined
  );
  const [regionFilter, setRegionFilter] = useState<string | undefined>(
    undefined
  );
  const [admissionDateFilter, setAdmissionDateFilter] = useState<
    string | undefined
  >(undefined);

  const apiClient = useApiClient();
  const {
    data: students,
    error,
    isLoading,
  } = useApi<Student[]>(
    `/api/students/?page=${currentPage}&page_size=${pageSize}&search=${
      searchFilter || ""
    }&gender=${genderFilter || ""}®ion=${regionFilter || ""}`,
    apiClient
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleFilterChange = (
    filterType: "gender" | "region" | "admission_date",
    value: string | undefined
  ) => {
    switch (filterType) {
      case "gender":
        setGenderFilter(value);
        break;
      case "region":
        setRegionFilter(value);
        break;
      case "admission_date":
        setAdmissionDateFilter(value);
        break;
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string | undefined) => {
    setSearchFilter(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
    // Consider adding mutate() here if needed to revalidate data after filters change
  }, [
    currentPage,
    pageSize,
    searchFilter,
    genderFilter,
    regionFilter,
    admissionDateFilter,
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Students</h2>
        <Link href={"/dashboard/admin/students/create"}>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Create New Student
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
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Admission Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
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
                  Error loading student list.
                </div>
              </TableCell>
            </TableRow>
          ) : students && students.length > 0 ? (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.region}</TableCell>
                <TableCell>
                  {student.admission_date
                    ? format(new Date(student.admission_date), "PPP")
                    : "-"}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/students/${student.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>No students found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
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
            {students ? Math.ceil(students.length / pageSize) : 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              students ? currentPage >= students.length / pageSize : true
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

export default StudentList;