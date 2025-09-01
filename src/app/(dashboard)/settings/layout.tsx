import { DashboardLayout } from "@/components/layout/dashboard/layout";
import SettingsSidebar from "@/components/organisms/app-sidebar/settings-sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Monitor, Store, Wrench } from 'lucide-react'

const settingsSidebarNavItems = [
  {
    title: 'Store',
    href: '/settings/store',
    icon: <Store size={18} />,
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: <Wrench size={18} />,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: <Bell size={18} />,
  },
  {
    title: 'Display',
    href: '/settings/display',
    icon: <Monitor size={18} />,
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