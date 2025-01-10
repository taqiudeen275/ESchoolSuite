/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface FieldErrors {
  [key: string]: string[];
}

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFieldErrors({});

    // Handle password confirmation match
    if (password !== confirmPassword) {
      setFieldErrors({ password2: ['Passwords do not match'] });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword, firstName, lastName, role }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Account created successfully.",
        });
        router.push("/auth/sign-in");
      } else {
        if (data.errors) {
          setFieldErrors(data.errors.errors);
        }
      }
    } catch (error) {
      setFieldErrors({ 
        general: ['An unexpected error occurred. Please try again later.'] 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName: string) => {
    if (fieldErrors[fieldName]) {
      return (
        <div className="text-destructive text-sm mt-1">
          {fieldErrors[fieldName].map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {fieldErrors.general && (
            <div className="mb-4 p-2 bg-destructive/10 text-destructive rounded-md">
              {fieldErrors.general.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className={fieldErrors.username ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {renderFieldError('username')}
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {renderFieldError('email')}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
                className={fieldErrors.first_name ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {renderFieldError('first_name')}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                className={fieldErrors.last_name ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {renderFieldError('last_name')}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} disabled={isLoading}>
                <SelectTrigger 
                  id="role" 
                  className={fieldErrors.role ? "border-destructive focus-visible:ring-destructive" : ""}
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="PARENT">Parent</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                  <SelectItem value="LIBRARIAN">Librarian</SelectItem>
                </SelectContent>
              </Select>
              {renderFieldError('role')}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={fieldErrors.password ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {renderFieldError('password')}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className={fieldErrors.password2 ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {renderFieldError('password2')}
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="w-full text-center text-sm mt-2">
          <Link
            href="/auth/sign-in"
            className="text-muted-foreground hover:underline"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}