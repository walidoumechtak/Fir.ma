import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/components/layout/dashboard-layout"


import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <DashboardLayout>{children}</DashboardLayout>         
    </>
  );
}
