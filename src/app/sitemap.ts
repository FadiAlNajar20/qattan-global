import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://qattanglobal.com";

const pages = ["", "about", "history", "brands", "sectors", "partners", "gallery", "contact"];
const locales = ["en", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page ? `/${page}` : ""}`])
          ),
        },
      });
    }
  }

  return entries;
}
