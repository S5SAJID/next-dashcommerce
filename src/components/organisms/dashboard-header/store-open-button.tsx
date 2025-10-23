"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { Store } from "lucide-react";
import Link from "next/link";


export default function DashboardStoreOpenButton() {
  const { store } = useDashboardStoreInfo();
  if (!store) return null;

  const baseDomain = (process.env.BETTER_AUTH_URL ?? "http://localhost:3000").split("//")[1];

  const storeUrl = `http://${store.domain}.${baseDomain}`;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button asChild variant="ghost" size="icon">
          <Link href={storeUrl} target="_blank" prefetch={false}>
            <Store />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Open Store</TooltipContent>
    </Tooltip>
  )
}