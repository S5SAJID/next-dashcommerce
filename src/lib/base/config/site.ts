export const siteConfig = {
	domain: process.env.CUSTOM_ROOT_DOMAIN ?? "www.s5arc.store",
	protocol: process.env.NODE_ENV === "development" ? "http" : "https",
};

export const getBaseUrl = () => `${siteConfig.protocol}://${siteConfig.domain}`;
