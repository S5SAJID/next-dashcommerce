import { Main } from "@/components/layout/main";
import AppSidebar from "@/components/organisms/app-sidebar";
import { SiteHeader } from "@/components/organisms/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardProviders from "@/providers/dashboard/providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Custom Eco', // %s will be replaced by the child page's title
    default: 'Custom Eco', // Fallback title for pages without a specific title
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProviders>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='@container/content'>
          <main className="flex-1 w-full h-full">
            <SiteHeader title="" />
            <Main>
              {children}
            </Main>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProviders>
  )
}