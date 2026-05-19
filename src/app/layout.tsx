import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "@/lib/content";
import { ScrollExperience } from "@/components/ScrollExperience";

export const metadata: Metadata = {
  title: "CQuest | Technology Provider",
  description: "Technology, managed operations, customer experience, and support solutions for modern businesses.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <ScrollExperience />
        <span id="top" className="page-top-anchor" />
        {children}
      </body>
    </html>
  );
}
