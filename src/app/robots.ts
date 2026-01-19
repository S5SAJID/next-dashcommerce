import { getBaseUrl } from "@/lib/base/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/dashboard/", "/auth/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/api/", "/dashboard/", "/auth/"],
			},
		],
		sitemap: `${getBaseUrl()}/sitemap.xml`,
	};
}
