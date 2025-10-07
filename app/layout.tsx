import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { defaultLocale } from "../i18n/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: "Fuhrpark Manager",
    template: "%s | Fuhrpark Manager"
  },
  description:
    "Modern fleet management CRM for vehicles, maintenance, repairs and compliance.",
  metadataBase: new URL("https://fuhrpark-manager.local"),
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
