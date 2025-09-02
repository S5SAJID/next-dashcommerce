import StoreFrontFooter from "@/components/storefront/organisms/footer";
import StoreFrontNavbar from "@/components/storefront/organisms/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "PP Mori" }}>
      <StoreFrontNavbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-6 pt-2 sm:px-6 lg:px-8">
        {children}
      </main>
      <StoreFrontFooter />
    </div>
  )
}