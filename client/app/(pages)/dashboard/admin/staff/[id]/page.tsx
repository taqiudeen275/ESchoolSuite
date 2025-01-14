// app/admin/staff/[id]/page.tsx
import { createServerAction, useAuth } from "nextjs-django-sdk";
import { z } from "zod";
import StaffDetails from "@/components/staff-detail";
import { notFound } from 'next/navigation'
import { cookies } from "next/headers";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Define Zod schema for Staff
const staffSchema = z.object({
  user: z.number(),
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

type Staff = z.infer<typeof staffSchema>;

async function fetchStaffDetails(
  id: number,
  serverAccessToken: string | null | undefined
): Promise<Staff | null> {
  if (!serverAccessToken) {
    // Handle the case where there's no access token (user might not be logged in)
    console.error("No access token available.");
    return null;
  }

  const api = await createServerAction(
    {
      baseUrl: process.env.NEXT_PUBLIC_API_URL!,
    },
    serverAccessToken
  );

  try {
    const response = await api.fetch<Staff>(`/api/staff/${id}/`);
    if (!response) {
      return null; // Handle 404 Not Found
    }
    console.log('Response', response);

    const data = await response;

    // Validate the data with Zod
    const validatedData = staffSchema.safeParse(data);
    if (!validatedData.success) {
      console.error("Data validation error:", validatedData.error);
      return null;
    }

    return validatedData.data;
  } catch (error) {
    console.error("API request error:", error);
    return null;
  }
}

export default async function StaffDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const serverAccessToken = (await cookies()).get('access_token')?.value;

  const staffData = await fetchStaffDetails(id, serverAccessToken);


  if (!staffData) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin/staff">
          <ChevronLeft size={28} className="text-gray-600 hover:text-gray-800" />
        </Link>
        <h2 className="text-2xl font-bold">Staff Details</h2>
      </div>
      <StaffDetails staffData={staffData} />
    </div>
  );
}