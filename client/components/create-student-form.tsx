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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const createStudentFormSchema = z.object({
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
  phone_number: z.string().optional(),
  admission_number: z.string().optional(),
  admission_date: z.string().optional(),
  emergency_contact_name: z.string().min(1, {message: "Emergency contact name is required"}),
  emergency_contact_phone: z.string().min(1, {message: "Emergency contact phone number is required"}),
  emergency_contact_relationship: z.string().min(1, {message: "Emergency contact relationship is required"}),
  medical_conditions: z.string().optional(),
  allergies: z.string().optional(),
  previous_school_name: z.string().optional(),
  previous_school_address: z.string().optional(),
  previous_school_contact: z.string().optional(),
  religion: z.string().optional(),
  denomination: z.string().optional(),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long"}),
  parent_first_name: z.string().min(1, { message: "First name is required" }),
  parent_last_name: z.string().min(1, { message: "Last name is required" }),
  parent_middle_name: z.string().optional(),
  parent_occupation: z.string().optional(),
  parent_email: z.string().email({ message: "Invalid email address" }),
  parent_phone_number: z.string().min(1, { message: "Phone number is required" }),
  parent_address: z.string().optional(),
  parent_place_of_work: z.string().optional(),
});

type CreateStudentFormValues = z.infer<typeof createStudentFormSchema>;

const CreateStudentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const apiClient = useApiClient();
  const { toast } = useToast();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>();

  const form = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentFormSchema),
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
      admission_number: "",
      admission_date: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relationship: "",
      medical_conditions: "",
      allergies: "",
      previous_school_name: "",
      previous_school_address: "",
      previous_school_contact: "",
      religion: "",
      denomination: "",
      username: "",
      password: "",
      parent_first_name: "",
      parent_last_name: "",
      parent_middle_name: "",
      parent_occupation: "",
      parent_email: "",
      parent_phone_number: "",
      parent_address: "",
      parent_place_of_work: "",
    },
  });

  const onSubmit = async (data: CreateStudentFormValues) => {
    setIsSubmitting(true);

    // Format dates to ISO 8601 format
    const formattedData = {
      ...data,
      date_of_birth: dateOfBirth
        ? format(dateOfBirth, "yyyy-MM-dd")
        : "",
      admission_date: admissionDate
        ? format(admissionDate, "yyyy-MM-dd")
        : "",
    };

    try {
      // Create the user first
      const userResponse:any = await apiClient.fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          role: "STUDENT",
          first_name: data.first_name, // Assuming these are used for the user account as well
          last_name: data.last_name,
        }),
      });

      if (!userResponse) {
        const errorData = await userResponse.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to create user",
        });
        return;
      }

      const userData = await userResponse.json();

      // Then create the parent
      const parentResponse:any = await apiClient.fetch("/api/users/parents/", {
        method: "POST",
        body: JSON.stringify({
          user: userData.id,
          first_name: data.parent_first_name,
          last_name: data.parent_last_name,
          middle_name: data.parent_middle_name,
          occupation: data.parent_occupation,
          email: data.parent_email,
          phone_number: data.parent_phone_number,
          address: data.parent_address,
          place_of_work: data.parent_place_of_work,
        }),
      });
      if (!parentResponse.ok) {
        const errorData = await parentResponse.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to create parent",
        });
        return;
      }

      const parentData = await parentResponse.json();

      // Then create the student profile
      const studentResponse:any = await apiClient.fetch("/api/students/", {
        method: "POST",
        body: JSON.stringify({
          user: userData.id,
          parent: parentData.id, // Use the newly created parent's ID
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          date_of_birth: formattedData.date_of_birth,
          gender: data.gender,
          address: data.address,
          city: data.city,
          region: data.region,
          nationality: data.nationality,
          email: data.email,
          phone_number: data.phone_number,
          admission_number: data.admission_number,
          admission_date: formattedData.admission_date,
          emergency_contact_name: data.emergency_contact_name,
          emergency_contact_phone: data.emergency_contact_phone,
          emergency_contact_relationship: data.emergency_contact_relationship,
          medical_conditions: data.medical_conditions,
          allergies: data.allergies,
          previous_school_name: data.previous_school_name,
          previous_school_address: data.previous_school_address,
          previous_school_contact: data.previous_school_contact,
          religion: data.religion,
          denomination: data.denomination,
        }),
      });

      if (studentResponse.ok) {
        toast({
          title: "Success",
          description: "Student profile created successfully.",
        });
        form.reset();
        router.push("/admin/students"); // Redirect to the student list
      } else {
        const errorData = await studentResponse.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to create student profile",
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
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name */}
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

        {/* Last Name */}
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

        {/* Middle Name (Optional) */}
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

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      {dateOfBirth ? (
                        format(dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
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

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  {/* Add more options if needed */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
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

        {/* City */}
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

        {/* Region */}
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

        {/* Nationality */}
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

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Admission Number */}
        <FormField
          control={form.control}
          name="admission_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admission Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter admission number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Admission Date */}
        <FormField
          control={form.control}
          name="admission_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Admission Date (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !admissionDate && "text-muted-foreground"
                      )}
                    >
                      {admissionDate ? (
                        format(admissionDate, "PPP")
                      ) : (
                        <span>Pick an admission date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={admissionDate}
                    onSelect={setAdmissionDate}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown-buttons"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact Name */}
        <FormField
          control={form.control}
          name="emergency_contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter emergency contact name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact Phone */}
        <FormField
          control={form.control}
          name="emergency_contact_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter emergency contact phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact Relationship */}
        <FormField
          control={form.control}
          name="emergency_contact_relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Relationship</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter emergency contact relationship"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Medical Conditions */}
        <FormField
          control={form.control}
          name="medical_conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Conditions (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter medical conditions"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Allergies */}
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter allergies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous School Name */}
        <FormField
          control={form.control}
          name="previous_school_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous School Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter previous school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous School Address */}
        <FormField
          control={form.control}
          name="previous_school_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous School Address (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter previous school address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous School Contact */}
        <FormField
          control={form.control}
          name="previous_school_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous School Contact (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter previous school contact"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Religion */}
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter religion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Denomination */}
        <FormField
          control={form.control}
          name="denomination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Denomination (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter denomination" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent/Guardian Information */}
        <h3 className="text-lg font-medium mt-6 mb-2">
          Parent/Guardian Information
        </h3>

        {/* Parent First Name */}
        <FormField
          control={form.control}
          name="parent_first_name"
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

        {/* Parent Last Name */}
        <FormField
          control={form.control}
          name="parent_last_name"
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

        {/* Parent Middle Name (Optional) */}
        <FormField
          control={form.control}
          name="parent_middle_name"
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

        {/* Parent Occupation */}
        <FormField
          control={form.control}
          name="parent_occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter occupation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Email */}
        <FormField
          control={form.control}
          name="parent_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Phone Number */}
        <FormField
          control={form.control}
          name="parent_phone_number"
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

        {/* Parent Address */}
        <FormField
          control={form.control}
          name="parent_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Place of Work */}
        <FormField
          control={form.control}
          name="parent_place_of_work"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place of Work (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter place of work" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Student"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateStudentForm;