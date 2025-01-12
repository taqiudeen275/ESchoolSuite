"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
       <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}