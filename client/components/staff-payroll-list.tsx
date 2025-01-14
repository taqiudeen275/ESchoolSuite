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
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

// Define Zod schema for Payroll
const payrollSchema = z.object({
  id: z.number(),
  staff: z.string(), // You might want to replace this with a nested object containing staff details
  start_date: z.string(),
  end_date: z.string(),
  basic_salary: z.string(),
  allowances: z.string(),
  deductions: z.string(),
  net_pay: z.string(),
  payment_date: z.string(),
  status: z.enum(["Pending", "Paid"]),
  notes: z.string().nullable(),
});
const payrollListSchema = z.array(payrollSchema);

type Payroll = z.infer<typeof payrollSchema>;

const StaffPayrollList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(
    undefined
  );

  const apiClient = useApiClient();
  const {
    data: payrollList,
    error,
    isLoading,
    mutate,
  } = useApi<Payroll[]>(
    `/api/staff/payroll/?page=${currentPage}&page_size=${pageSize}&search=${
      searchFilter || ""
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

  const handleSearchChange = (value: string | undefined) => {
    setSearchFilter(value);
    setCurrentPage(1); // Reset to the first page when changing search
  };

  useEffect(() => {
    mutate();
  }, [currentPage, pageSize, searchFilter, mutate]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Staff Payroll</h2>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search..."
          value={searchFilter}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Staff ID</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Basic Salary</TableHead>
            <TableHead>Allowances</TableHead>
            <TableHead>Deductions</TableHead>
            <TableHead>Net Pay</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={10}>
                <div className="flex items-center text-red-500">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Error loading payroll data.
                </div>
              </TableCell>
            </TableRow>
          ) : payrollList && payrollList.length > 0 ? (
            payrollList.map((payroll) => (
              <TableRow key={payroll.id}>
                <TableCell>{payroll.id}</TableCell>
                <TableCell>{payroll.staff}</TableCell>
                <TableCell>{payroll.start_date}</TableCell>
                <TableCell>{payroll.end_date}</TableCell>
                <TableCell>{payroll.basic_salary}</TableCell>
                <TableCell>{payroll.allowances}</TableCell>
                <TableCell>{payroll.deductions}</TableCell>
                <TableCell>{payroll.net_pay}</TableCell>
                <TableCell>{payroll.payment_date}</TableCell>
                <TableCell>
                  <Badge
                    variant={payroll.status === "Paid" ? "default" : "secondary"}
                  >
                    {payroll.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10}>No payroll data found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {currentPage} of {payrollList ? Math.ceil(payrollList.length / pageSize) : 1}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            payrollList ? currentPage >= payrollList.length / pageSize : true
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StaffPayrollList;