import CreatePayrollForm from "@/components/create-payroll-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePayrollPage() {
  return (
    <div className="p-6">
       <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin/payroll">
          <ChevronLeft size={28} className="text-gray-600 hover:text-gray-800" />
        </Link>
      <h2 className="text-2xl font-bold mb-4">Create Payroll Entry</h2>
      </div>
      <CreatePayrollForm />
    </div>
  );
}