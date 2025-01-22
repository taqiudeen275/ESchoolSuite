"use client";

import { useApi, useApiClient } from "nextjs-django-sdk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

type Student = z.infer<typeof studentSchema>;

interface StudentProfileProps {
  id: number;
}

const StudentProfile = ({ id }: StudentProfileProps) => {
  const apiClient = useApiClient();
  const { data: student, error, isLoading } = useApi<Student>(
    `/api/students/${id}/`,
    apiClient
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            {/* Add more skeletons for other fields */}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-red-500">
        <AlertCircle className="mr-2 h-5 w-5" />
        Error loading student details.
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {student.first_name} {student.last_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Student ID:</span>{" "}
            {student.student_id}
          </div>
          <div>
            <span className="font-semibold">First Name:</span>{" "}
            {student.first_name}
          </div>
          <div>
            <span className="font-semibold">Last Name:</span> {student.last_name}
          </div>
          {student.middle_name && (
            <div>
              <span className="font-semibold">Middle Name:</span>{" "}
              {student.middle_name}
            </div>
          )}
          <div>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {format(new Date(student.date_of_birth), "PPP")}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {student.gender}
          </div>
          <div>
            <span className="font-semibold">Address:</span> {student.address}
          </div>
          <div>
            <span className="font-semibold">City:</span> {student.city}
          </div>
          <div>
            <span className="font-semibold">Region:</span> {student.region}
          </div>
          <div>
            <span className="font-semibold">Nationality:</span>{" "}
            {student.nationality}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {student.email}
          </div>
          <div>
            <span className="font-semibold">Phone Number:</span>{" "}
            {student.phone_number || "-"}
          </div>
          <div>
            <span className="font-semibold">Admission Number:</span>{" "}
            {student.admission_number || "-"}
          </div>
          <div>
            <span className="font-semibold">Admission Date:</span>{" "}
            {student.admission_date
              ? format(new Date(student.admission_date), "PPP")
              : "-"}
          </div>
          <div>
            <span className="font-semibold">Emergency Contact Name:</span>{" "}
            {student.emergency_contact_name}
          </div>
          <div>
            <span className="font-semibold">Emergency Contact Phone:</span>{" "}
            {student.emergency_contact_phone}
          </div>
          <div>
            <span className="font-semibold">
              Emergency Contact Relationship:
            </span>{" "}
            {student.emergency_contact_relationship}
          </div>
          {student.medical_conditions && (
            <div>
              <span className="font-semibold">Medical Conditions:</span>{" "}
              {student.medical_conditions}
            </div>
          )}
          {student.allergies && (
            <div>
              <span className="font-semibold">Allergies:</span>{" "}
              {student.allergies}
            </div>
          )}
          {/* ... other fields ... */}
          <div className="mt-4 flex gap-2">
            <Link href={`/admin/students/edit/${student.id}`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            {/* Add Delete button with confirmation dialog if needed */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfile;