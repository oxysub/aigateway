import { COMPANY } from "@/lib/constants";

export const SITE_URL = "https://aigateway.my";

export const SITE_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/oil-gas", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/staff-augmentation", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/training", changeFrequency: "monthly" as const, priority: 0.7 },
] as const;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: COMPANY.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo.webp"),
    description: COMPANY.subheadline,
    email: COMPANY.contactEmail,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.slice(0, 2).join(", "),
      addressLocality: "Petaling Jaya",
      addressRegion: "Selangor",
      postalCode: "47301",
      addressCountry: "MY",
    },
    areaServed: {
      "@type": "Country",
      name: "Malaysia",
    },
    knowsAbout: [
      "Enterprise AI",
      "Industrial IoT",
      "Oil and Gas Technology",
      "Predictive Maintenance",
      "HSE Systems",
      "Data Intelligence",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: SITE_URL,
    description: COMPANY.headline,
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.webp"),
      },
    },
  };
}
