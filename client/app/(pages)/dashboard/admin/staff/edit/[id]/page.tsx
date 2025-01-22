import EditStaffForm from "@/components/edit_staff_form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function EditStaffPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin/staff">
          <ChevronLeft size={28} className="text-gray-600 hover:text-gray-800" />
        </Link>
      <h2 className="text-2xl font-bold mb-4">Edit Staff Member</h2>
      </div>
      <EditStaffForm id={id} />
    </div>
  );
}