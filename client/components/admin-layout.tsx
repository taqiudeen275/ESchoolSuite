"use client";
import React, { useState } from "react";
import Sidebar from "./side-bar";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`hidden md:flex ${
          isSidebarOpen ? "w-64" : "w-20"
        } flex-col`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 flex flex-col">
        <nav className="flex items-center px-4 py-2 border-b">
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6" onClick={toggleSidebar} />
            </SheetTrigger>
            <SheetContent side="left">
              <Sidebar isSidebarOpen={true} />
            </SheetContent>
          </Sheet>
          <div className="ml-auto">
            {/* Add user profile dropdown or other elements here */}
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;