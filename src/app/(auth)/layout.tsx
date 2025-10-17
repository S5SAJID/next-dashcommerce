import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import AuthPagesProviders from "@/providers/auth/providers";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    template: '%s | Custom Eco', // %s will be replaced by the child page's title
    default: 'Custom Eco', // Fallback title for pages without a specific title
  },
  icons: [
    {
      url: "/favico.svg"
    }
  ]
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthPagesProviders>
        <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
          <div className='lg:p-8'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
              <div className='mb-4 flex items-center justify-center'>
                <h1 className='text-xl font-medium'>Custom Eco</h1>
              </div>
            </div>
            {children}
          </div>
          <div
            className={cn(
              'bg-muted relative h-full overflow-hidden max-lg:hidden',
              '[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none'
            )}
          >
            <Image
              src={"/assets/pages/signin/dashboard-light.png"}
              className='dark:hidden'
              width={1024}
              height={1151}
              alt='Custom Eco Dashboard'
            />
            <Image
              src={"/assets/pages/signin/dashboard-dark.png"}
              className='hidden dark:block'
              width={1024}
              height={1138}
              alt='Custom Eco Dashboard'
            />
          </div>
        </div>
      </AuthPagesProviders>
      <Toaster />
    </>
  );
}