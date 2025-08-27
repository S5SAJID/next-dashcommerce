import { DashboardLayout, DashboardHeader, DashboardTitle } from "../dashboard/layout"
import { Card } from "@/components/ui/card"

export function FormPageGridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 items-start">
      {children}
    </div>
  )
}

export function FormPageGridPrimary({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-2 space-y-4">
      <Card>
        {children}
      </Card>
    </div>
  )
}

export function FormPageGridSecondary({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      {children}
    </Card>
  )
}

export {
  DashboardLayout as FormPageLayout,
  DashboardHeader as FormPageHeader,
  DashboardTitle as FormPageTitle,
}