import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-screen items-center flex-col space-y-1 justify-center min-h-screen">
      <h1>Testing ShadCN UI</h1>
      <Link href="/products">
        <Button>Open products</Button>
      </Link>
    </div>
  );
}
