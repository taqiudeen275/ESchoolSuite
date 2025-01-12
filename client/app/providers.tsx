"use client";

import { ApiProvider } from "nextjs-django-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiProvider
      config={{
        baseUrl: process.env.NEXT_PUBLIC_API_URL!, // Your Django API base URL
        tokenPrefix: 'Bearer', // Default: 'Bearer'
        accessTokenLifetime: 300, // Default: 300 (5 minutes)
        refreshTokenLifetime: 86400, // Default: 86400 (24 hours)
        autoRefresh: true, // Default: true
        csrfEnabled: true, 
        retryAttempts: 3,
        retryDelay: 10000
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ApiProvider>
  );
}