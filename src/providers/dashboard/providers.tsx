"use client";

import { dashboardQueryClient } from "@/lib/dashboardQueryClient";
import { ThemeProvider } from "../theme-provider";
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={dashboardQueryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <ProgressProvider
          color="var(--foreground)"
          spinnerPosition="bottom-right"
        >
          {children}
          <ReactQueryDevtools />
        </ProgressProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}