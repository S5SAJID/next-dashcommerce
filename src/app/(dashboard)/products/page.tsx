import { ProductsPrimaryButtons } from "@/components/molecules/primary-buttons/products";
import ProductsTable from "@/components/organisms/tables/products-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your products in the dashboard.",
}

export default function ProductsPage() {
  return (
    <div>
      <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Products</h2>
          <p className='text-muted-foreground'>
            Here you can manage all your products.
          </p>
        </div>
        <ProductsPrimaryButtons />
      </div>

      <ProductsTable />
    </div>
  )
}