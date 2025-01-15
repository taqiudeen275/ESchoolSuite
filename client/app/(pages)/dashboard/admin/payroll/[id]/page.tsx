import PayrollDetail from "@/components/payroll-detail";

export default function PayrollDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Detail</h2>
      <PayrollDetail id={id} />
    </div>
  );
}