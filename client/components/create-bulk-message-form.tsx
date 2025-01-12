/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApiClient } from "nextjs-django-sdk";

const bulkMessageSchema = z.object({
  recipient_group: z.string().min(1, { message: "Please select a recipient group" }),
  custom_recipients: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  message_body: z.string().min(1, { message: "Message body is required" }),
  delivery_method: z.enum(["email", "sms"]),
  scheduled_time: z.string().optional(), // No need for .datetime()
});

type BulkMessageFormValues = z.infer<typeof bulkMessageSchema>;

const CreateBulkMessageForm = () => {
  const [isCustomRecipients, setIsCustomRecipients] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [date, setDate] = useState<Date>();
  const apiClient = useApiClient();
  const { toast } = useToast();

  const form = useForm<BulkMessageFormValues>({
    resolver: zodResolver(bulkMessageSchema),
    defaultValues: {
      recipient_group: "",
      custom_recipients: "",
      subject: "",
      message_body: "",
      delivery_method: "email",
      scheduled_time: "",
    },
  });

  const onSubmit = async (data: BulkMessageFormValues) => {
    setIsSubmitting(true);
  
    // Format date and time to ISO 8601 format if scheduled_time is provided
    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      data.scheduled_time = `${format(date, "yyyy-MM-dd")}'T'${hours}:${minutes}:00Z`;
    }
  
    try {
      const response = await apiClient.fetch<any>("/api/communications/bulk-messages/", {
        method: "POST",
        body: JSON.stringify(data),
      });
  
      // Assuming a successful response has a status code of 201 (Created)
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Bulk message created successfully.",
        });
        form.reset(); // Reset the form after successful creation
      } else {
        // Handle unexpected response statuses
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.error || "Failed to create bulk message",
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
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormField
          control={form.control}
          name="delivery_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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

        <FormField
          control={form.control}
          name="scheduled_time"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Scheduled Time (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "yyyy-MM-dd'T'HH:mm")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Message"}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default CreateBulkMessageForm;