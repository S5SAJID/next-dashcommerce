import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { homePageMetaData } from "@/lib/base/seo/home-page-metadata";

export const metadata = homePageMetaData;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body
				className={`${GeistSans.variable} font-sans ${GeistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
