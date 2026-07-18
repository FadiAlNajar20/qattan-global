import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import {
  isLocale,
  getDictionary,
  getLocaleDir,
  getLocaleLang,
} from "@/lib/i18n";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getLocaleDir(locale);
  const lang = getLocaleLang(locale);

  const orgJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html
      lang={lang}
      dir={dir}
      className="scroll-smooth"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${instrumentSans.variable} font-sans antialiased bg-[var(--color-bg-light)] text-[var(--color-text-dark)]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation dict={dict} locale={locale} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
      </body>
    </html>
  );
}
