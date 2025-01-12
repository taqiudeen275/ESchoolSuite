"use client";

import BulkMessageList from "@/components/bulk-message-list";
import CreateBulkMessageForm from "@/components/create-bulk-message-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import React, { useState } from "react";

const BulkMessagingPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Bulk Messages</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Create New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            {/* Render the form inside the modal */}
            <CreateBulkMessageForm />
          </DialogContent>
        </Dialog>
      </div>
      <BulkMessageList />
    </div>
  );
};

export default BulkMessagingPage;