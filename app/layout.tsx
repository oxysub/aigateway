import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY, SEO_KEYWORDS } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Gateway | Enterprise AI, IoT & Data Intelligence",
    template: "%s | AI Gateway",
  },
  description:
    "Enterprise AI, Industrial IoT and Data Intelligence for safer, smarter operations in Malaysia. Registered Petronas vendor. HSE systems, predictive maintenance, asset monitoring and AI readiness.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.name,
  publisher: COMPANY.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Gateway | Enterprise AI, IoT & Data Intelligence",
    description:
      "Enterprise AI, IoT and data intelligence for safer, smarter operations. Registered Petronas vendor, MOF Malaysia.",
    type: "website",
    locale: "en_MY",
    siteName: COMPANY.name,
    url: SITE_URL,
    images: [
      {
        url: "/logo.webp",
        width: 1024,
        height: 545,
        alt: `${COMPANY.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Gateway | Enterprise AI, IoT & Data Intelligence",
    description:
      "Enterprise AI, IoT and data intelligence for safer, smarter oil & gas and industrial operations.",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
