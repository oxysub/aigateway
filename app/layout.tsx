import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SEO_KEYWORDS } from "@/lib/constants";
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
  title: {
    default: "AI Gateway | Enterprise AI, IoT & Data Intelligence",
    template: "%s | AI Gateway",
  },
  description:
    "Enterprise AI, Industrial IoT and Data Intelligence for oil & gas and industrial operations in Malaysia. Registered Petronas vendor. HSE systems, predictive maintenance, asset monitoring and AI readiness.",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: "AI Gateway" }],
  openGraph: {
    title: "AI Gateway | Enterprise AI, IoT & Data Intelligence",
    description:
      "Enterprise AI, IoT and data intelligence for oil & gas operations. Registered Petronas vendor, MOF Malaysia.",
    type: "website",
    locale: "en_MY",
    siteName: "AI Gateway",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Gateway | Enterprise AI, IoT & Data Intelligence",
    description:
      "Enterprise AI, IoT and data intelligence for oil & gas and industrial operations.",
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}
