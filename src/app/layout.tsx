import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";
import FooterMenu from "@/components/FooterMenu";
import ContextProvider from "@/components/ContextProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TV",
  description: "My TV Website"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider>
            <main>{children}</main>
            <TopNavigation></TopNavigation>
            <FooterMenu></FooterMenu>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
