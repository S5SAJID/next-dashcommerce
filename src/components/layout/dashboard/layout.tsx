export default function ProductsPage() {
  return (
    <div>
      
          <h2 className='text-2xl font-bold tracking-tight'>Products</h2>
          <p className='text-muted-foreground'>
            Here you can manage all your products.
          </p>
        </div>
        {/* <ProductsPrimaryButtons /> */}
      </div>

      {/* <ProductsTable /> */}
    </div>
  )
}

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
        <div>
          {children}
        </div>
    </div>
  );
}