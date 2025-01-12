// app/(pages)/students/page.tsx
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data for now
const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    program: "Computer Science",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    program: "Business Administration",
  },
  // ... more students
];

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Simulate loading data from an API
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <Badge>In progress</Badge>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableCaption>List of students.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.program}</TableCell>
                <TableCell>
                  <Link href={`/students/view/${student.id}`} passHref>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}       