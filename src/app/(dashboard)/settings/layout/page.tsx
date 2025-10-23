import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout"
import StoreLayoutSettingsForm from "@/components/organisms/forms/dashboard/settings/layout"
import { getDashboadStore } from "@/db/actions/dashboard/settings/layout/actions";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Layout Settings"
}

export default async function StoreSettingsPage() {
  const {data: store} = await getDashboadStore();

  return (
    <SubSettingsPageLayout
      title="SEO"
      desc="SEO for your store to make it rank in the search engine."
    >
      <StoreLayoutSettingsForm settings={store?.settings}/>
    </SubSettingsPageLayout>
  )
}