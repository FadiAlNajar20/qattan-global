import type { Metadata } from "next";
import type { Locale } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://qattanglobal.com";

interface MetadataParams {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  siteName: string;
  imageUrl?: string;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  siteName,
  imageUrl,
}: MetadataParams): Metadata {
  const canonical = `${BASE_URL}/${locale}${path ? `/${path}` : ""}`;

  const ogImage = imageUrl ?? `${BASE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en${path ? `/${path}` : ""}`,
        ar: `${BASE_URL}/ar${path ? `/${path}` : ""}`,
        "x-default": `${BASE_URL}/en${path ? `/${path}` : ""}`,
      },
    },
    openGraph: {
      title,
      description,
      siteName,
      type: "website",
      locale: locale === "ar" ? "ar_JO" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_JO",
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Qattan Global",
    alternateName: "قطان جلوبال",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.webp`,
    foundingDate: "1951",
    foundingLocation: {
      "@type": "Place",
      name: "Amman, Jordan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+96279709066",
      contactType: "customer service",
      email: "contact@qattanglobal.com",
      availableLanguage: ["English", "Arabic"],
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Qattan Global",
    url: BASE_URL,
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
