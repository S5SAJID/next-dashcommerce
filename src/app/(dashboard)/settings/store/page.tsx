import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout"
import StoreSettingsForm from "@/components/organisms/forms/dashboard/settings/store-settings"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Store Settings"
}

export default function StoreSettingsPage() {
  return (
    <SubSettingsPageLayout
      title="Store"
      desc="This is the store and website settings."
    >
      <StoreSettingsForm />
    </SubSettingsPageLayout>
  )
}