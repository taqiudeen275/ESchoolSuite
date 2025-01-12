/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useApi, useApiClient } from "nextjs-django-sdk";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Define Zod schema for BulkMessage
const bulkMessageSchema = z.object({
  id: z.number(),
  sender: z.string(),
  recipient_group: z.string(),
  custom_recipients: z.string().nullable(),
  subject: z.string(),
  message_body: z.string(),
  delivery_method: z.enum(["email", "sms"]),
  status: z.enum(["Pending", "Sent", "Failed"]),
  scheduled_time: z.string().datetime().nullable(),
  sent_time: z.string().datetime().nullable(),
});

type BulkMessage = z.infer<typeof bulkMessageSchema>;

const BulkMessageDetail = ({ id }: { id: number }) => {
  const apiClient = useApiClient();
  const {
    data: message,
    error,
    isLoading,
    mutate,
  } = useApi<BulkMessage>(`/api/communications/bulk-messages/${id}/`, apiClient);
  const [messageData, setMessageData] = useState<BulkMessage | null>(null);
 const {toast} = useToast()
  useEffect(() => {
    if (message) {
      setMessageData(message);
    }
  }, [message]);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await apiClient.fetch(`/api/communications/bulk-messages/${id}/`, {
        method: "DELETE",
      });
      // Trigger a revalidation to update the list after deletion
      mutate();
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
      router.push(`/dashboard/admin/bulk-messaging/`);
    } catch (error: any) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: error.message || "Error deleting message",
      });
    }
  };
  const handleStatusUpdate = async (newStatus: "Pending" | "Sent" | "Failed") => {
    try {
      const response = await apiClient.fetch<any>(`/api/communications/bulk-messages/${id}/`, {
        method: "PATCH", // Use PATCH to partially update
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        // Update the local data with SWR using mutate
        const updatedMessage = await response.json();
        mutate(updatedMessage);
        setMessageData(updatedMessage)
      } else {
        // Handle error if the update fails
        console.error("Error updating status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            {/* Add more skeletons for other fields */}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-red-500">
        <AlertCircle className="mr-2 h-5 w-5" />
        Error loading message details.
      </div>
    );
  }

  if (!messageData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Details (ID: {messageData.id})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Sender:</span> {messageData.sender}
          </div>
          <div>
            <span className="font-semibold">Recipient Group:</span>{" "}
            {messageData.recipient_group}
          </div>
          {messageData.custom_recipients && (
            <div>
              <span className="font-semibold">Custom Recipients:</span>
              <pre className="bg-gray-100 p-2 rounded-md">
                {messageData.custom_recipients}
              </pre>
            </div>
          )}
          <div>
            <span className="font-semibold">Subject:</span> {messageData.subject}
          </div>
          <div>
            <span className="font-semibold">Message Body:</span>
            <pre className="bg-gray-100 p-2 rounded-md">
              {messageData.message_body}
            </pre>
          </div>
          <div>
            <span className="font-semibold">Delivery Method:</span>
            <Badge
              variant={
                messageData.delivery_method === "email"
                  ? "default"
                  : "secondary"
              }
            >
              {messageData.delivery_method}
            </Badge>
          </div>
          <div>
            <span className="font-semibold">Status:</span>
            <Badge
                    variant={
                      messageData.status === "Failed"
                        ? "destructive"
                        : messageData.status === "Sent"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {messageData.status}
                  </Badge>
          </div>
          <div>
            <span className="font-semibold">Scheduled Time:</span>
            {messageData.scheduled_time
              ? new Date(messageData.scheduled_time).toLocaleString()
              : "-"}
          </div>
          <div>
            <span className="font-semibold">Sent Time:</span>
            {messageData.sent_time
              ? new Date(messageData.sent_time).toLocaleString()
              : "-"}
          </div>
          {/* Add more fields as needed */}
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={`/dashboard/admin/bulk-messaging/edit/${messageData.id}`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => handleDelete(messageData.id)}
          >
            Delete
          </Button>
          {/* Buttons for updating status */}
          <Button
            variant="outline"
            disabled={messageData.status === "Pending"}
            onClick={() => handleStatusUpdate("Pending")}
          >
            Mark as Pending
          </Button>
          <Button
            variant="outline"
            disabled={messageData.status === "Sent"}
            onClick={() => handleStatusUpdate("Sent")}
          >
            Mark as Sent
          </Button>
          <Button
            variant="outline"
            disabled={messageData.status === "Failed"}
            onClick={() => handleStatusUpdate("Failed")}
          >
            Mark as Failed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkMessageDetail;