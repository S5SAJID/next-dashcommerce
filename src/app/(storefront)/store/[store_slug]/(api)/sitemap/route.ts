import { getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import { getPublicStoreFront } from "@/db/actions/storefront/store/public/actionts";
import { applyCache, tags } from "@/lib/cache/cache-manager";
import { NextRequest } from "next/server";

export async function GET(
	_req: NextRequest,
	ctx: RouteContext<"/store/[store_slug]/sitemap">,
) {
	const { store_slug } = await ctx.params;
	if (!store_slug) {
		return new Response("Store slug is required", { status: 400 });
	}

	const sitemapXML = await getCachedSitemap(store_slug);

	if (!sitemapXML) {
		return new Response("Storefront not found", { status: 404 });
	}

	return new Response(sitemapXML, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}

async function getCachedSitemap(storeSlug: string) {
	"use cache";

	const storefront = await getPublicStoreFront(storeSlug);
	if (!storefront) return;

	applyCache(tags.store(storefront.id), tags.storeProducts(storefront.id));

	const baseUrl = `https://${storefront.domain}.${process.env.CUSTOM_ROOT_DOMAIN}`;

	const products = await getPublicStorefrontProducts(storeSlug);

	const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
              <loc>${baseUrl}</loc>
              <lastmod>${storefront.updated_at.toISOString()}</lastmod>
              <priority>1.0</priority>
          </url>
         ${products
						.map(
							(p) => `
        <url>
          <loc>${baseUrl}/product/${p.slug}</loc>
          <lastmod>${p.updated_at.toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>
      `,
						)
						.join("")}
    </urlset>`
		.replace(/\s+/g, " ")
		.trim();

	return sitemapContent;
}
