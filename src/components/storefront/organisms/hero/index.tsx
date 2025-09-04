import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type StoreFrontHeroProps = {
  title: string,
  description: string,
  cta: {
    link: string,
    text: string,
    target: "_blank" | "self"
  },
  image: {
    url: string,
    alt: string
  }
}

export default function StoreFrontHero({ title, description, cta, image }: StoreFrontHeroProps) {
  return (
    <Card className="shadow-none border-none bg-muted flex items-center md:flex-row gap-2 aspect-square md:aspect-[21/9]">
      <div className="w-full py-8 md:px-8">
        <CardHeader className="my-auto h-auto">
          <CardTitle className="text-4xl md:text-6xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-4">
          <Button asChild>
            <Link href={cta.link} target={cta.target}>{cta.text}</Link>
          </Button>
        </CardFooter>
      </div>
      <div className="rounded hidden md:block mr-8 bg-muted aspect-square overflow-hidden">
        <Image width={450} className="rounded object-cover h-full w-full" height={450} src={image.url} alt={image.alt} />
      </div>
    </Card>
  )
}