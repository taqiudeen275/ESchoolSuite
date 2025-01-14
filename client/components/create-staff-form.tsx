/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useApiClient } from "nextjs-django-sdk";
import { useRouter } from "next/navigation";

const createStaffFormSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  middle_name: z.string().optional(),
  date_of_birth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  experience: z.string().optional(),
  date_joined: z.string().min(1, { message: "Date joined is required" }),
  salary: z.string().min(1, { message: "Salary is required" }),
  social_security_number: z.string().optional(),
  bank_name: z.string().optional(),
  bank_account_number: z.string().optional(),
  bank_branch: z.string().optional(),
 
});

type CreateStaffFormValues = z.infer<typeof createStaffFormSchema>;

const CreateStaffForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const apiClient = useApiClient();
  const { toast } = useToast();

  const form = useForm<CreateStaffFormValues>({
    resolver: zodResolver(createStaffFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      date_of_birth: "",
      gender: "",
      address: "",
      city: "",
      region: "",
      nationality: "",
      email: "",
      phone_number: "",
      qualification: "",
      experience: "",
      date_joined: "",
      salary: "",
      social_security_number: "",
      bank_name: "",
      bank_account_number: "",
      bank_branch: "",
      // role: "STAFF",
      // username: "",
      // password: ""
    },
  });

  const onSubmit = async (data: CreateStaffFormValues) => {
    setIsSubmitting(true);
    try {
      // // Create the user first
      // const userResponse:any = await apiClient.fetch("/api/users/register/", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     username: data.username,
      //     email: data.email,
      //     password: data.password,
      //     password2: data.password,
      //     role: "STAFF",
      //     first_name: data.first_name,
      //     last_name: data.last_name,
      //   }),
      // });
  
      // if (!userResponse) {
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description:  "Failed to create user",
      //   });
      //   return;
      // }

      // console.log("Response from server", userResponse)
      // console.log("Staff user id", userResponse.data.user.id)
  
  
      // Then create the staff profile
      const staffResponse:any = await apiClient.fetch("/api/staff/", {
        method: "POST",
        body: JSON.stringify({
          // user: userResponse.data.user, // Use the newly created user's ID
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          address: data.address,
          city: data.city,
          region: data.region,
          nationality: data.nationality,
          email: data.email,
          phone_number: data.phone_number,
          qualification: data.qualification,
          experience: data.experience,
          date_joined: data.date_joined,
          salary: data.salary,
          social_security_number: data.social_security_number,
          bank_name: data.bank_name,
          bank_account_number: data.bank_account_number,
          bank_branch: data.bank_branch,
        }),
      });
  
      if (staffResponse) {
        toast({
          title: "Success",
          description: "Staff member created successfully.",
        });
        form.reset();
        router.push("/admin/staff"); // Redirect to the staff list
      } else {
        const errorData = await staffResponse;
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to create staff member",
        });
      }
    } catch (error: any) {
      console.log(error)
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
   

        {/* Staff fields */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middle_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter middle name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="Enter region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualification</FormLabel>
              <FormControl>
                <Input placeholder="Enter qualification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_joined"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Joined</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter salary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_security_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Security Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter social security number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Branch (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank branch" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Staff Member"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateStaffForm;