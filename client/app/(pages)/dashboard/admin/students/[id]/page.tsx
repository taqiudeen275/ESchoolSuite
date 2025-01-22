import { createServerAction } from "nextjs-django-sdk";
import StudentProfile from "@/components/student-profile";
import { z } from "zod";
import { cookies } from "next/headers";

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

async function fetchStudentDetails(id: number, serverAccessToken: string) {
  const api = await createServerAction(
    {
      baseUrl: process.env.NEXT_PUBLIC_API_URL!,
    },
    serverAccessToken
  );
  const data = await api.fetch<Student>(`/api/students/${id}/`);
  const validatedData = studentSchema.safeParse(data);
  if (!validatedData.success) {
    console.log(validatedData.error);
    return null;
  }
  return validatedData.data;
}

export default async function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const serverAccessToken = (await cookies()).get('access_token')?.value;

  const studentData = await fetchStudentDetails(id, serverAccessToken?? '');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      {studentData ? (
        <StudentProfile id={studentData.id} />
      ) : (
        <div>Error loading student data.</div>
      )}
    </div>
  );
}