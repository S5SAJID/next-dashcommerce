import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout"
import StoreSettingsForm from "@/components/organisms/forms/dashboard/settings/store"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "General Store Settings"
}

export default function StoreSettingsPage() {
  return (
    <SubSettingsPageLayout
      title="General"
      desc="General settings about store."
    >
      <StoreSettingsForm />
    </SubSettingsPageLayout>
  )
}