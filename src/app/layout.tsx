import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={`font-sans antialiased`}>{children}</body>
		</html>
	);
}
