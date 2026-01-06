import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import AppShell from '@/components/AppShell';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Young Money Trading Journal",
  description: "Professional Forex Trading Journal & Portfolio Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          {/* App shell includes sidebar and header (client components) */}
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
