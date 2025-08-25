import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from 'geist/font/mono'

import "./globals.css";

export const metadata: Metadata = {
  title: "Custom Eco",
  description: "Checking UI Stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} font-sans ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
