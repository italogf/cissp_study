import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";

import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "CISSP Focus Studio",
  description:
    "A Clay-inspired multilingual CISSP study SaaS for ADHD/TDHA learners."
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale?: string;
  }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale ?? "en"} className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
