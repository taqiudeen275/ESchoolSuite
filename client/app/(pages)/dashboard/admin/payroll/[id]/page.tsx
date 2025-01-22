import PayrollDetail from "@/components/payroll-detail";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PayrollDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  return (
    <div className="p-6">
       <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin/payroll">
          <ChevronLeft size={28} className="text-gray-600 hover:text-gray-800" />
        </Link>
      <h2 className="text-2xl font-bold mb-4">Payroll Detail</h2>
      </div>
      <PayrollDetail id={id} />
    </div>
  );
}