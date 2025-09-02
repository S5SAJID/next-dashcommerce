import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function StoreFrontFooter() {
  return (
    <footer className="w-full bg-muted pt-12 md:pt-16 pb-6">
      <div className="px-4 sm:px-6 lg:px-8 gap-16 text-sm mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3">
        <div>
          <p className="font-bold">Acme store.</p>
        </div>
        <div>
          <ul>
            <li className="font-bold mb-2">Shop</li>
            <li>
              <Link href="#" className="hover:underline">Digital</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">Apparel</Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">Accessories</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 justify-end">
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="#" target="_blank">
              <Twitter />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="#" target="_blank">
              <Instagram />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="#" target="_blank">
              <Facebook />
            </Link>
          </Button>
        </div>
      </div>
      <div className="pt-18 text-muted-foreground text-center text-sm">
        <p>© 2025 Acme store. All rights reserved.</p>
      </div>
    </footer>
  )
}