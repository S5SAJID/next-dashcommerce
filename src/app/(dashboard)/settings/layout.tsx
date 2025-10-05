import { DashboardLayout } from "@/components/layout/dashboard/layout";
import SettingsSidebar from "@/components/organisms/app-sidebar/settings-sidebar";
import { Separator } from "@/components/ui/separator";
import { Store, Layout } from 'lucide-react'

const settingsSidebarNavItems = [
  {
    title: 'General',
    href: '/settings/general',
    icon: <Store size={18} />,
  },
  {
    title: 'Layout',
    href: '/settings/layout',
    icon: <Layout size={18} />,
  },
]

export default function SettingsPageLayout({children}: {children: React.ReactNode}) {
  return (
    <DashboardLayout>
      <div className="space-y-0.5">
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Settings
        </h1>
        <p className='text-muted-foreground'>
          Manage your store settings and set your preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          <SettingsSidebar items={settingsSidebarNavItems} />
        </aside>
        <div className='flex w-full overflow-y-hidden p-1'>
          {children}
        </div>
      </div>
    </DashboardLayout>
  )
}