"use client";

import { ApiProvider } from "nextjs-django-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiProvider
      config={{
        baseUrl: process.env.NEXT_PUBLIC_API_URL!, // Your Django API base URL
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ApiProvider>
  );
}