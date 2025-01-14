import EditStaffForm from "@/components/edit_staff_form";

export default function EditStaffPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Staff Member</h2>
      <EditStaffForm id={id} />
    </div>
  );
}