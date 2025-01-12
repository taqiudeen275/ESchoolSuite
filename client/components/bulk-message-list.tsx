/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useApi, useApiClient } from "nextjs-django-sdk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "./ui/badge";
import { MoreHorizontal, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";

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
// Schema for an array of bulk messages
const bulkMessagesSchema = z.array(bulkMessageSchema);

type BulkMessage = z.infer<typeof bulkMessageSchema>;

const BulkMessageList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recipientGroupFilter, setRecipientGroupFilter] = useState<
    string | undefined
  >(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [deliveryMethodFilter, setDeliveryMethodFilter] = useState<
    string | undefined
  >(undefined);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(
    undefined
  );
  const apiClient = useApiClient();

  const {
    data: bulkMessages,
    error,
    isLoading,
    mutate,
  } = useApi<BulkMessage[]>(
    `/api/communications/bulk-messages/?page=${currentPage}&page_size=${pageSize}&recipient_group=${
      recipientGroupFilter || ""
    }&status=${statusFilter || ""}&delivery_method=${
      deliveryMethodFilter || ""
    }&search=${searchFilter || ""}`,
    apiClient
  );

  useEffect(() => {
    mutate();
  }, [
    currentPage,
    pageSize,
    recipientGroupFilter,
    statusFilter,
    deliveryMethodFilter,
    searchFilter,
    mutate,
  ]);

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
    } catch (error: any) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: error.message || "Error deleting message",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  const handleFilterChange = (
    filterType: "recipient_group" | "status" | "delivery_method",
    value: string | undefined
  ) => {
    switch (filterType) {
      case "recipient_group":
        setRecipientGroupFilter(value);
        break;
      case "status":
        setStatusFilter(value);
        break;
      case "delivery_method":
        setDeliveryMethodFilter(value);
        break;
    }
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  const handleSearchChange = (value: string | undefined) => {
    setSearchFilter(value);
    setCurrentPage(1); // Reset to the first page when changing search
  };

  return (
    <div>
     
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={recipientGroupFilter}
          onValueChange={(value) =>
            handleFilterChange("recipient_group", value)
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Recipient Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="All Students">All Students</SelectItem>
            <SelectItem value="All Parents">All Parents</SelectItem>
            <SelectItem value="All Teachers">All Teachers</SelectItem>
            <SelectItem value="All Staff">All Staff</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={deliveryMethodFilter}
          onValueChange={(value) =>
            handleFilterChange("delivery_method", value)
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Delivery Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search..."
          value={searchFilter}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-48"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient Group</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message Body</TableHead>
            <TableHead>Delivery Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled Time</TableHead>
            <TableHead>Sent Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Show loading skeleton
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={10}>
                Error loading bulk messages.
              </TableCell>
            </TableRow>
          ) : bulkMessages && bulkMessages.length > 0 ? (
            bulkMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.sender}</TableCell>
                <TableCell>{message.recipient_group}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{message.message_body.slice(0, 50)}...</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      message.delivery_method === "email"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {message.delivery_method}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      message.status === "Failed"
                        ? "destructive"
                        : message.status === "Sent"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {message.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {message.scheduled_time
                    ? new Date(message.scheduled_time).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {message.sent_time
                    ? new Date(message.sent_time).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-900">
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the message.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(message.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10}>No bulk messages found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-2">
            Page {currentPage} of{" "}
            {bulkMessages ? Math.ceil(bulkMessages.length / pageSize) : 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              bulkMessages ? currentPage >= bulkMessages.length / pageSize : true
            }
          >
            Next
          </Button>
        </div>
        <div>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BulkMessageList;