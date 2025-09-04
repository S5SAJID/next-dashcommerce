import StoreFrontFooter from "@/components/storefront/organisms/footer";
import StoreFrontNavbar from "@/components/storefront/organisms/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Store',
    default: 'Acme Store | Premium daily products',
  },
}

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