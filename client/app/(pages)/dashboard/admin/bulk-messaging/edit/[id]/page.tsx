import EditBulkMessageForm from "@/components/edit-bulk-message-form";

export default function EditBulkMessagePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Bulk Message</h2>
      <EditBulkMessageForm id={id} />
    </div>
  );
}