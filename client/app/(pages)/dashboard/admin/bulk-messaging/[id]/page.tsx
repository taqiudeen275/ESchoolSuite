import BulkMessageDetail from "@/components/bulk-message-detail";

export default function BulkMessageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bulk Message Detail</h2>
      <BulkMessageDetail id={id} />
    </div>
  );
}