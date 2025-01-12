/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useApi, useApiClient } from "nextjs-django-sdk";
import { useRouter } from "next/navigation";

const bulkMessageSchema = z.object({
  recipient_group: z.string().min(1, { message: "Please select a recipient group" }),
  custom_recipients: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  message_body: z.string().min(1, { message: "Message body is required" }),
  delivery_method: z.enum(["email", "sms"]),
  scheduled_time: z.string().optional(), // No need for .datetime()
  status: z.enum(["Pending", "Sent", "Failed"]).optional()
});

type BulkMessageFormValues = z.infer<typeof bulkMessageSchema>;

const EditBulkMessageForm = ({ id }: { id: number }) => {
  const [isCustomRecipients, setIsCustomRecipients] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const apiClient = useApiClient();
  const { toast } = useToast();

  const { data: message, error, isLoading, mutate } = useApi<BulkMessageFormValues>(
    `/api/communications/bulk-messages/${id}/`,
    apiClient
  );

  const form = useForm<BulkMessageFormValues>({
    resolver: zodResolver(bulkMessageSchema),
    defaultValues: {
      recipient_group: "",
      custom_recipients: "",
      subject: "",
      message_body: "",
      delivery_method: "email",
      scheduled_time: "",
      status: "Pending"
    },
  });

  useEffect(() => {
    if (message) {
      // Pre-fill the form with fetched data
      form.reset(message);
      setIsCustomRecipients(message.recipient_group === "Custom Recipients");
    }
  }, [message, form]);

  const onSubmit = async (data: BulkMessageFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await apiClient.fetch<any>(
        `/api/communications/bulk-messages/${id}/`,
        {
          method: "PATCH", // Use PATCH for partial updates
          body: JSON.stringify(data),
        }
      );

      if (response) {
        toast({
          
          title: "Success",
          description: "Bulk message updated successfully.",
        });
        mutate(data)
        router.push(`/dashboard/admin/bulk-messaging/${id}`); // Navigate back to the detail view
      } else {
        const errorData = await response;
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to update bulk message",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a Skeleton component
  }

  if (error) {
    return <div>Error loading message data.</div>;
  }

  if (!message) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Recipient Group */}
        <FormField
          control={form.control}
          name="recipient_group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Group</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setIsCustomRecipients(value === "Custom Recipients");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a recipient group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All Students">All Students</SelectItem>
                  <SelectItem value="All Parents">All Parents</SelectItem>
                  <SelectItem value="All Teachers">All Teachers</SelectItem>
                  <SelectItem value="All Staff">All Staff</SelectItem>
                  <SelectItem value="Custom Recipients">
                    Custom Recipients
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Custom Recipients */}
        {isCustomRecipients && (
          <FormField
            control={form.control}
            name="custom_recipients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Recipients</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter email addresses or phone numbers separated by commas or newlines."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Body */}
        <FormField
          control={form.control}
          name="message_body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter message body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Delivery Method */}
        <FormField
          control={form.control}
          name="delivery_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="email" />
                    </FormControl>
                    <FormLabel className="font-normal">Email</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sms" />
                    </FormControl>
                    <FormLabel className="font-normal">SMS</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Message"}
        </Button>
      </form>
    </Form>
  );
};

export default EditBulkMessageForm;