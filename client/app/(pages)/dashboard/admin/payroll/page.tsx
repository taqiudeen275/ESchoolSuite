"use client"
import PayrollList from "@/components/payroll-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PayrollPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Payroll</h2>
        <Link href={"/dashboard/admin/payroll/create"}>
          <Button>Create Payroll</Button>
        </Link>
      </div>
      <PayrollList />
    </div>
  );
}