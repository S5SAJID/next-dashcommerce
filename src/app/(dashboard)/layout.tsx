import { Main } from "@/components/layout/main";
import AppSidebar from "@/components/organisms/app-sidebar";
import { SiteHeader } from "@/components/organisms/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth/auth";
import DashboardProviders from "@/providers/dashboard/providers";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: '%s | Custom Eco', // %s will be replaced by the child page's title
    default: 'Custom Eco', // Fallback title for pages without a specific title
  },
  icons: [
    {
      url: "/favico.svg"
    }
  ]
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  return (
    <DashboardProviders>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='@container/content'>
          <main className="flex-1 w-full h-full">
            <SiteHeader />
            <Main>
              {children}
            </Main>
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProviders>
  )
}