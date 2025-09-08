import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/demoData";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function StoreFrontProductCard({ product }: { product: Product }) {
  return (
    <Card className="bg-none p-0 gap-0 text-card-foreground overflow-hidden border-none shadow-none">
      <CardHeader className="p-0 group relative overflow-hidden gap-0">
        <Link href={`/store/products/${product.slug}`} className="group-hover:opacity-75">
          <Image
            width={450}
            height={450}
            alt={`${product.name} preview image`}
            className={`h-full bg-muted ${product.images.length > 1 ? "group-hover:hidden" : ""} w-full object-cover rounded-xl`}
            src={product.images[0]} />
          {product.images[1] ? (
            <Image
              width={450}
              height={450}
              alt={`${product.name} preview image`}
              className="h-full hidden group-hover:block w-full object-cover rounded-xl"
              src={product.images[0]} />
          ) : null}
        </Link>
        <div className="absolute -bottom-14 z-10 transition-[opacity_transform] backdrop-blur-sm duration-300 opacity-0 group-hover:opacity-100 group-hover:bottom-0 right-0 left-0 p-2 rounded-b-lg bg-muted-foreground/10">
          <Button variant="secondary" size="lg" className="rounded-full bg-background hover:bg-background hover:text-foreground/60 w-full">Add to cart</Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-1 flex flex-col text-left">
        <Link href={`#${product.name}`} className="text-sm hover:underline text-primary/90">{product.name}</Link>
        <p className="text-sm">{formatPrice({ locale: "en-US", price: product.price })}</p>
      </CardContent>
    </Card>
  )
}