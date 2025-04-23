import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/layout/dashboard-layout"


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
  title: "Forge",
  description: "Powred by walid oumechtak",
  icons: {
    icon: "/logo.png",
  },
};

import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";
import { AuthProvider } from "../context/AuthProvider";
import { QueryProvider } from "@/providers/query-provider";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html className="light" lang="en" suppressHydrationWarning>
        {/* <head /> */}
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossOrigin=""
          />
        </Head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <AuthProvider>
                {/* <QueryProvider>{children}</QueryProvider> */}
                {/* <DashboardLayout>{children}</DashboardLayout> */}
                {children}
                <Toaster />
              </AuthProvider>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
