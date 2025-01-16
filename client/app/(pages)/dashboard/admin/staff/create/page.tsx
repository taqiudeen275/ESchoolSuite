import CreateStaffForm from "@/components/create-staff-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateStaffPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin/staff">
          <ChevronLeft size={28} className="text-gray-600 hover:text-gray-800" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">Create New Staff Member</h2>
      </div>
      <CreateStaffForm />
    </div>
  );
};

export default CreateStaffPage;