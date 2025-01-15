import CreatePayrollForm from "@/components/create-payroll-form";

export default function CreatePayrollPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Payroll Entry</h2>
      <CreatePayrollForm />
    </div>
  );
}