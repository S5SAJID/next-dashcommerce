export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function DashboardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
      {children}
    </div>
  )
}

export function DashboardTitle({ title, description }: { title: string, description: string }) {
  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
      <p className='text-muted-foreground'>
        {description}
      </p>
    </div>
  )
}