"use client";
import { cn } from "@/lib/utils";
import { Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const pathname = usePathname();
  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Bulk Messaging",
      href: "/admin/bulk-messaging",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    // Add more sidebar items here
  ];
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-y-4 bg-muted p-6 transition-all duration-300",
        !isSidebarOpen && "justify-center"
      )}
    >
      {sidebarItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <div
            className={cn(
              "group flex cursor-pointer items-center gap-x-4 rounded-lg p-2 hover:bg-accent",
              pathname === item.href && "bg-accent",
              !isSidebarOpen && "justify-center"
            )}
          >
            {item.icon}
            <span
              className={cn(
                "origin-left text-sm font-medium",
                !isSidebarOpen && "invisible scale-0"
              )}
            >
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;