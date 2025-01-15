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
  import { Badge } from "@/components/ui/badge";
  import { AlertCircle } from "lucide-react";
  import { z } from "zod";
  import { Skeleton } from "@/components/ui/skeleton";
  import { useEffect, useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { format } from "date-fns";
  import { CalendarIcon } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { Calendar } from "@/components/ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import Link from "next/link";
  

const payrollSchema = z.object({
  id: z.number(),
  staff: z.string(), // Staff ID
  start_date: z.string(),
  end_date: z.string(),
  basic_salary: z.string(),
  allowances: z.string().nullable(),
  deductions: z.string().nullable(),
  net_pay: z.string(),
  payment_date: z.string(),
  status: z.enum(["Pending", "Paid"]),
  notes: z.string().nullable(),
});

const payrollListSchema = z.array(payrollSchema);
const StaffNameSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
  });

type Payroll = z.infer<typeof payrollSchema>;
type StaffName = z.infer<typeof StaffNameSchema>


const PayrollList = () => {
    const apiClient = useApiClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [paymentDateFilter, setPaymentDateFilter] = useState<
    { from: Date | undefined; to?: Date | undefined } | undefined
  >(undefined);
  const [staffNames, setStaffNames] = useState<Record<number, StaffName>>({});

  // Construct the API URL with filters
  const apiUrl = `/api/staff/payroll/?page=${currentPage}&page_size=${pageSize}&status=${
    statusFilter || ""
  }&payment_date_start=${
    paymentDateFilter?.from
      ? format(paymentDateFilter.from, "yyyy-MM-dd")
      : ""
  }&payment_date_end=${
    paymentDateFilter?.to ? format(paymentDateFilter.to, "yyyy-MM-dd") : ""
  }`;

  const {
    data: payrolls,
    error,
    isLoading,
  } = useApi<Payroll[]>(apiUrl, apiClient);

  
    // Fetch staff names for each payroll entry
    useEffect(() => {
        let isMounted = true;
      const fetchStaffNames = async () => {
        if (!payrolls) return;
        if (payrolls) {
          const names: Record<number, StaffName> = {};
          for (const payroll of payrolls) {
            try {
              const staffDetails = await apiClient.fetch<StaffName>(
                `/api/staff/${payroll.staff}/`
              );
              names[payroll.id] = staffDetails;
            } catch (error) {
              console.error(
                `Error fetching staff details for ID ${payroll.staff}:`,
                error
              );
              names[payroll.id] = { first_name: "N/A", last_name: "N/A" }; // Placeholder
            }
          }
          setStaffNames(names);
        }
      };
  
      fetchStaffNames();
    }, [payrolls]);
  
    const handleStatusFilterChange = (value: string | undefined) => {
        setStatusFilter(value);
        setCurrentPage(1); // Reset to first page when filters change
      };
    
      const handlePaymentDateFilterChange = (value: {
        from: Date | undefined;
        to?: Date | undefined;
      }) => {
        setPaymentDateFilter(value);
        setCurrentPage(1); // Reset to first page when filters change
      };
    
      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
      };
    
      const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1); // Reset to the first page when changing page size
      };

    if (isLoading) {
      return (

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Basic Salary</TableHead>
              <TableHead>Allowances</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Pay</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Show loading skeleton */}
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center text-red-500">
          <AlertCircle className="mr-2 h-5 w-5" />
          Error loading payroll information.
        </div>
      );
    }
  
 
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Payroll</h2>
      </div>
      {/* Filtering Controls */}
      <div className="flex items-center gap-4 mb-4">
        {/* Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={handleStatusFilterChange}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !paymentDateFilter && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {paymentDateFilter?.from ? (
                paymentDateFilter.to ? (
                  <>
                    {format(paymentDateFilter.from, "LLL dd, y")} -{" "}
                    {format(paymentDateFilter.to, "LLL dd, y")}
                  </>
                ) : (
                  format(paymentDateFilter.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={paymentDateFilter?.from}
              selected={paymentDateFilter}
              onSelect={(value) => handlePaymentDateFilterChange(value ?? { from: undefined, to: undefined })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Name</TableHead>
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
            // Show loading skeleton
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={8}>
                <div className="flex items-center text-red-500">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Error loading payroll information.
                </div>
              </TableCell>
            </TableRow>
          ) : payrolls && payrolls.length > 0 ? (
            payrolls.map((payroll) => (
                <Link key={payroll.id} href={`/dashboard/admin/payroll/${payroll.id}`}>
              <TableRow key={payroll.id}>
                <TableCell>{payroll.staff}</TableCell>
                <TableCell>
                  {staffNames[payroll.id]
                    ? `${staffNames[payroll.id].first_name} ${staffNames[payroll.id].last_name}`
                    : <Skeleton className="h-6 w-full" />}
                </TableCell>
                <TableCell>{payroll.basic_salary}</TableCell>
                <TableCell>{payroll.allowances || "-"}</TableCell>
                <TableCell>{payroll.deductions || "-"}</TableCell>
                <TableCell>{payroll.net_pay}</TableCell>
                <TableCell>
                  {new Date(payroll.payment_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={payroll.status === "Paid" ? "default" : "secondary"}
                  >
                    {payroll.status}
                  </Badge>
                </TableCell>
              </TableRow>
              </Link>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>No payroll records found.</TableCell>
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
            {payrolls ? Math.ceil(payrolls.length / pageSize) : 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              payrolls ? currentPage >= payrolls.length / pageSize : true
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

export default PayrollList;