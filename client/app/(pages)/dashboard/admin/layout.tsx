import AdminLayout from "@/components/admin-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;