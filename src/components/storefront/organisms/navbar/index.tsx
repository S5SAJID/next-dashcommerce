import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const links = [
  { title: "Digital", href: "/category/digital" },
  { title: "Beauty", href: "/category/beauty" },
  { title: "Apparel", href: "/category/apparel" },
]

export default function StoreFrontNavbar() {
  return (
    <nav className="z-50 py-4 sticky top-0 bg-background/90 backdrop-blur-xs">
      <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            <Link href="/store">Acme store.</Link>
          </h1>
          <div className="hidden md:block">
            {links.map(link => (
              <Button key={link.href} variant="link" asChild>
                <Link href={link.href}>{link.title}</Link>
              </Button>
            ))}
          </div>
        </div>
        {/* Right side */}
        <div className="flex gap-2">
          <Input type="search" placeholder="Search for products..." className="hidden md:block" />
          <Button size="icon" variant="outline">
            <User />
          </Button>
          <Button size="icon" variant="outline" className="relative">
            <ShoppingCart />
            {/* <div className="absolute -top-[0.2rem] -right-[0.2rem] size-2 rounded-full bg-blue-500 dark:bg-blue-400"></div> */}
          </Button>
        </div>
      </div>
    </nav>
  )
}