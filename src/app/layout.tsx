import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html className="light" lang="en" suppressHydrationWarning>
        <head />

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
