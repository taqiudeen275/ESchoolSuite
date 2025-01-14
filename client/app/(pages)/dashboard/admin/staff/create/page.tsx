import CreateStaffForm from "@/components/create-staff-form";
import React from "react";

const CreateStaffPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Staff Member</h2>
      <CreateStaffForm />
    </div>
  );
};

export default CreateStaffPage;