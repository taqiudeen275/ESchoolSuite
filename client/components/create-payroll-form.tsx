"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useApi, useApiClient } from "nextjs-django-sdk";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const createPayrollFormSchema = z.object({
  staff: z.string().min(1, { message: "Please select a staff member" }),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  basic_salary: z.string().min(1, { message: "Basic salary is required" }),
  allowances: z.string().optional(),
  deductions: z.string().optional(),
  payment_date: z.string().min(1, { message: "Payment date is required" }),
  status: z.enum(["Pending", "Paid"]),
  notes: z.string().optional(),
});

type CreatePayrollFormValues = z.infer<typeof createPayrollFormSchema>;

const CreatePayrollForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const apiClient = useApiClient();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [paymentDate, setPaymentDate] = useState<Date>();

  // Fetch staff list for the dropdown
  const {
    data: staffList,
    error: staffListError,
    isLoading: isStaffListLoading,
  } = useApi<
    {
      id: number;
      first_name: string;
      last_name: string;
      staff_id: string;
    }[]
  >("/api/staff/", apiClient);

  const form = useForm<CreatePayrollFormValues>({
    resolver: zodResolver(createPayrollFormSchema),
    defaultValues: {
      staff: "",
      start_date: "",
      end_date: "",
      basic_salary: "",
      allowances: "",
      deductions: "",
      payment_date: "",
      status: "Pending",
      notes: "",
    },
  });

  const onSubmit = async (data: CreatePayrollFormValues) => {
    setIsSubmitting(true);
    const formattedData = {
      ...data,
      start_date: startDate
        ? format(startDate, "yyyy-MM-dd")
        : "",
      end_date: endDate
        ? format(endDate, "yyyy-MM-dd")
        : "",
      payment_date: paymentDate ? format(paymentDate, "yyyy-MM-dd") : "",
    };

    try {
      const response:any = await apiClient.fetch("/api/staff/payroll/", {
        method: "POST",
        body: JSON.stringify(formattedData),
      });

      if (response) {
        toast({
          title: "Success",
          description: "Payroll entry created successfully.",
        });
        form.reset();
        router.push("/admin/payroll"); // Redirect to payroll list
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to create payroll entry",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Staff Select */}
        <FormField
          control={form.control}
          name="staff"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a staff member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isStaffListLoading ? (
                    <SelectItem value=" ">Loading...</SelectItem>
                  ) : staffListError ? (
                    <SelectItem value=" ">
                      Error loading staff list
                    </SelectItem>
                  ) : (
                    staffList?.map((staff) => (
                      <SelectItem key={staff.id} value={staff.staff_id}>
                        {staff.first_name} {staff.last_name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date("1900-01-01")}
                    captionLayout="dropdown-buttons"
                    fromYear={1960}
                    toYear={2030}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick an end date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Basic Salary */}
        <FormField
          control={form.control}
          name="basic_salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Basic Salary</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Allowances */}
        <FormField
          control={form.control}
          name="allowances"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allowances (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Deductions */}
        <FormField
          control={form.control}
          name="deductions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deductions (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Date */}
        <FormField
          control={form.control}
          name="payment_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Payment Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !paymentDate && "text-muted-foreground"
                      )}
                    >
                      {paymentDate ? (
                        format(paymentDate, "PPP")
                      ) : (
                        <span>Pick a payment date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={paymentDate}
                    onSelect={setPaymentDate}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Payroll Entry"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePayrollForm;