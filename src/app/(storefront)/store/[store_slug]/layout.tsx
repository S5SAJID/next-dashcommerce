import StoreFrontFooter from "@/components/storefront/organisms/footer";
import StoreFrontNavbar from "@/components/storefront/organisms/navbar";
import { getPublicStoreFront } from "@/db/actions/storefront/store/public/actionts";
import StoreFrontProviders from "@/providers/storefront/providers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ store_slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const storeSlug = (await params).store_slug;
  const store = await getPublicStoreFront(storeSlug);
  if (!store) return notFound();

  return {
    title: {
      template: `%s | ${store.name}`,
      default: store.settings.seo.title,
    },
    description: store.settings.seo.description,
    keywords: store.settings.seo.tags,
    icons: [{ url: "/store-favico.svg" }],
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode } & Props) {
  const storeSlug = (await params).store_slug;
  const store = await getPublicStoreFront(storeSlug);
  if (!store) return notFound();

  return (
    <div className="[&>*]:font-['PP_Mori']">
      <StoreFrontProviders>
        <StoreFrontNavbar store={store} />
        <main className="mx-auto w-full max-w-7xl min-h-[70dvh] px-4 pb-6 pt-2 sm:px-6 lg:px-8">
          {children}
        </main>
      </StoreFrontProviders>
      <StoreFrontFooter />
    </div>
  )
}
