import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database, GitMerge, Layout, Lock, Package, Settings, ShieldCheck, ShoppingCart, Store, Type, Users, Webhook } from "lucide-react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";


const leftFeatures = [
  { icon: Store, tooltip: "Multi-tenant architecture" },
  { icon: Lock, tooltip: "Modern authentication" },
  { icon: Package, tooltip: "Product management" },
  { icon: ShoppingCart, tooltip: "Order management" },
  { icon: Users, tooltip: "Customer management" },
  { icon: Settings, tooltip: "Store settings" },
];

const rightFeatures = [
  { icon: Layout, tooltip: "Layout customization" },
  { icon: Database, tooltip: "PostgreSQL Database" },
  { icon: Type, tooltip: "End-to-end type safety" },
  { icon: ShieldCheck, tooltip: "Security" },
  { icon: GitMerge, tooltip: "Drizzle ORM" },
  { icon: Webhook, tooltip: "Server Actions" },
];

export default function Home() {
  return (
    <TooltipProvider>
      <section className="py-32 h-dvh overflow-hidden">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="my-6 mt-20 text-pretty text-4xl font-light lg:text-6xl">
            NextDash Commerce
          </h1>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            A modern e-commerce platform built with Next.js 15, featuring an
            admin dashboard and storefront. This project explores cutting-edge
            web development patterns with a focus on type safety, multi-tenancy,
            and developer experience.
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/products">Get Started</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="https://github.com/S5SAJID/next-dashcommerce" target="_blank">
                Github Repo
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-12 sm:mt-32">
          <div className="container mx-auto">
            <div className="hidden items-center justify-center gap-x-12 md:flex">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center">
                  <FeatureIcon {...leftFeatures[0]} />
                </div>
                <div className="flex flex-col gap-20 items-center justify-center">
                  <FeatureIcon {...leftFeatures[1]} />
                  <FeatureIcon {...leftFeatures[2]} />
                </div>
                <div className="flex flex-col gap-20 items-center justify-center">
                  <FeatureIcon {...leftFeatures[3]} />
                  <FeatureIcon {...leftFeatures[4]} />
                  <FeatureIcon {...leftFeatures[5]} />
                </div>
              </div>
              <div className="flex aspect-[16/9] w-full max-w-3xl flex-col items-center overflow-clip rounded-md border border-border bg-muted p-2 shadow-sm sm:rounded-xl">
                <video
                  src="/preview.mp4"
                  className="h-full w-full rounded-md border object-cover"
                  autoPlay
                  muted
                  loop
                />
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-20 items-center justify-center">
                  <FeatureIcon {...rightFeatures[0]} />
                  <FeatureIcon {...rightFeatures[1]} />
                  <FeatureIcon {...rightFeatures[2]} />
                </div>
                <div className="flex flex-col gap-20 items-center justify-center">
                  <FeatureIcon {...rightFeatures[3]} />
                  <FeatureIcon {...rightFeatures[4]} />
                </div>
                <div className="flex flex-col gap-20 items-center justify-center">
                  <FeatureIcon {...rightFeatures[5]} />
                </div>
              </div>
            </div>
            <div className="container mx-auto md:hidden">
              <div className="mt-2 flex aspect-[16/9] w-full flex-col items-center overflow-clip rounded-md border border-border bg-muted p-2 shadow-sm sm:rounded-xl">
                <video
                  src="/preview.mp4"
                  className="h-full w-full rounded-md border object-cover"
                  autoPlay
                  muted
                  loop
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

const FeatureIcon = ({
  icon: Icon,
  tooltip,
}: {
  icon: LucideIcon;
  tooltip: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="size-12 rounded-2xl bg-secondary ring-1 ring-inset ring-accent-foreground/10">
        <Icon className="h-full w-full p-3 text-secondary-foreground" />
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);
