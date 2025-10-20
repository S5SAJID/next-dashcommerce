"use client";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { createDashboardStore } from '@/db/actions/dashboard/store/actions';
import { useSubdomainAvailabilityCheck } from '@/hooks/dashboard/store/use-subdomain-availablity';
import { storeFormSchema } from "./schema"
import { toastPromise } from '@/hooks/use-promise-toaster';

type StoreFormSchema = z.infer<typeof storeFormSchema>

export function StoreCreateForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const form = useForm<StoreFormSchema>({
    reValidateMode: "onChange",
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      subdomain: ""
    },
  })

  const isLoading = form.formState.isSubmitting;

  // Subdomain value to watch
  const subdomainFormVal = form.watch("subdomain")

  // 🤩 Use the extracted hook!
  const { isSubDomainChecking, isSubDomainAvailable } = useSubdomainAvailabilityCheck(
    form,
    subdomainFormVal,
    500 // Debounce time in ms
  );
  async function onSubmit(data: StoreFormSchema) {
    await toastPromise(createDashboardStore(data), {
      error: (error) => error.message || "Something went wrong!",
      success: () => {
        window.location.replace('/products');
        form.reset();
        return "Store created, Redirecting...";
      },
      loading: "Creating store..."
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3 space-y-4', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder='Enter your store name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subdomain'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain *</FormLabel>
              <div className="relative">
                <div className="flex items-center">
                  <FormControl>
                    <Input placeholder='Enter your store subdomain' {...field} />
                  </FormControl>
                  {/* Status Indicator */}
                  {isSubDomainChecking ? (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
                  ) : isSubDomainAvailable ? (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                  ) : null}
                </div>
              </div>
              <FormMessage />
              <FormDescription>This subdomain will form your store&apos;s url. eg: acme -{">"} acme.eco.com</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter short description of your store' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid">
          <Button className='mt-2' type="submit" disabled={isLoading || !isSubDomainAvailable || isSubDomainChecking}>
            {isLoading ? <Loader className='animate-spin' /> : null}
            Create store
          </Button>
        </div>
        {/* <FormDescription>Don&apos;t worry too much, you can always change these in the settings page later.</FormDescription> */}
      </form>
    </Form>
  )
}