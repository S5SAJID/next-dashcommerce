import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-screen items-center flex-col space-y-1 justify-center h-screen overflow-hidden text-center">
      <h1 className="text-7xl max-w-3xl font-light">
        Custom Ecommerce Admin with ShadCN UI.
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Ecommerce user interface with client side functionalities to some extent. <br />
        You can quick start creating your ecommerce webapp with it.
      </p>
      <div className="flex space-x-2">
        <Button asChild className="mt-4">
          <Link href="/products">
            Go to Products
          </Link>
        </Button>
        <Button asChild variant="secondary" className="mt-4">
          <Link href="/products">
            Github Repo
          </Link>
        </Button>
      </div>
    </div>
  );
}
