import JsonLd from "@/components/atoms/seo/json-ld";
import { homePageJsonLD, homePageMetaData } from "@/lib/base/seo/home-page-metadata";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = homePageMetaData;
const dmSans = DM_Sans({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<main className={dmSans.className}>
				<JsonLd data={homePageJsonLD} />
				{children}
			</main>
		</ThemeProvider>
	);
}
