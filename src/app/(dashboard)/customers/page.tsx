import { DashboardHeader, DashboardLayout, DashboardTitle } from "@/components/layout/dashboard/layout";
import { CustomersPrimaryButtons } from "@/components/molecules/primary-buttons/customers";
import CustomersTable from "@/components/organisms/tables/customers-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage your all your customers.",
}

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle title="Customers" description="Manage your all your customers."/>
        <CustomersPrimaryButtons />
      </DashboardHeader>
      <CustomersTable />
    </DashboardLayout>
  );
}