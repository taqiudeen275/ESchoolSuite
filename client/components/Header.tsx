"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/students", label: "Students" },
  { href: "/students/add", label: "Add Student" },
  { href: "/students/view", label: "View Students" },
  { href: "/staff", label: "Staff" },
  { href: "/staff/add", label: "Add Staff" },
  { href: "/staff/view", label: "View Staff" },
  { href: "/parents", label: "Parents" },
  { href: "/parents/add", label: "Add Parent" },
  { href: "/parents/view", label: "View Parents" },
  { href: "/accountants", label: "Accountants" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-4">
      <div className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} passHref>
            <Button
              variant={pathname === link.href ? "default" : "ghost"}
              className="w-full justify-start"
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  );
}