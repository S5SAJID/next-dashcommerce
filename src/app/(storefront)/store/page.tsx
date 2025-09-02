import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// TODO: add dummy products

export default function StoreFrontPage() {
  return (
    <main className="space-y-4">
      <Card className="shadow-none border-none bg-muted flex items-center md:flex-row gap-2 aspect-square md:aspect-[21/9]">
        <div className="w-full py-8 md:px-8">
          <CardHeader className="my-auto h-auto">
            <CardTitle className="text-4xl md:text-6xl">The fastest way to sell with Stripe.</CardTitle>
            <CardDescription>Acme is Stripe-native commerce. Open-Source, Next.js, zero bloat. Spin up a store in minutes, scale without the Shopify tax.</CardDescription>
          </CardHeader>
          <CardFooter className="mt-4">
            <Button asChild>
              <Link href="#">Get started now</Link>
            </Button>
          </CardFooter>
        </div>
        <div className="rounded hidden md:block mr-8 bg-muted aspect-square overflow-hidden">
          <Image width={450} className="rounded object-cover h-full w-full" height={450} src="/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg" alt={"hero image"} />
        </div>
      </Card>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="bg-none p-0 gap-0 text-card-foreground overflow-hidden border-none shadow-none">
            <CardHeader className="p-0 group relative overflow-hidden gap-0">
              <Link href={`#${i}`} className="group-hover:opacity-75">
                <Image
                  width={450}
                  height={450}
                  alt={`${i} image`}
                  className="h-full group-hover:hidden w-full object-cover rounded-xl"
                  src="/storefront/demo/products/Default_product_image_of_a_bag_for_ecommerce_website_12028129-BHMR9OOrV50zy2Wg0XeiKWDIKdVTNB.jpg" />
                <Image
                  width={450}
                  height={450}
                  alt={`${i} image`}
                  className="h-full hidden group-hover:block w-full object-cover rounded-xl"
                  src="/storefront/demo/products/Default_product_image_of_a_bag_for_ecommerce_website_32028129-OB8fak65hzYdme64y6lrVehZgPxruS.jpg" />
              </Link>
              <div className="absolute -bottom-14 z-10 transition-[opacity_transform] backdrop-blur-sm duration-300 opacity-0 group-hover:opacity-100 group-hover:bottom-0 right-0 left-0 p-2 rounded-b-lg bg-muted-foreground/10">
                <Button variant="secondary" size="lg" className="rounded-full bg-background hover:bg-background hover:text-foreground/60 w-full">Add to cart</Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-1 flex flex-col text-left">
              <Link href={`#${i}`} className="text-sm hover:underline text-primary/90">Sunbeam Tote</Link>
              <p className="text-sm">{`$${i}00.00`}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
