import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import CTABanner from "@/components/sections/CTABanner";
import { brandLogos } from "@/content/brands";

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
  return buildMetadata({
    locale,
    path: "gallery",
    title: dict.gallery.heroTitle,
    description: dict.gallery.heroSubtitle,
    siteName: dict.meta.siteName,
  });
}

// We use brand logo images as gallery items since no dedicated gallery photos were provided.
// This approach uses the actual project assets (brand logos from Shopify CDN).
const galleryImages = brandLogos.slice(0, 24).map((b) => ({
  src: b.url,
  alt: b.name,
  width: 400,
  height: 400,
}));

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const g = dict.gallery;

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-primary)] pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 50% 40%, rgba(200,191,176,0.06), transparent 70%)",
          }}
        />
        <Container>
          <FadeIn>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <li>
                  <a
                    href={`/${locale}`}
                    className="hover:text-[var(--color-accent)] transition-colors"
                  >
                    {dict.breadcrumbs.home}
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-[var(--color-accent)]">
                  {dict.nav.gallery}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {g.heroEyebrow}
            </p>
            <h1 className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight max-w-3xl">
              {g.heroTitle}
            </h1>
            <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl">
              {g.heroSubtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-white">
        <Container className="section-spacing">
          <GalleryGrid
            images={galleryImages}
            closeLabel={g.lightboxClose}
            nextLabel={g.lightboxNext}
            prevLabel={g.lightboxPrev}
            imageAriaLabel={dict.aria.lightboxImage}
            locale={locale}
          />
        </Container>
      </section>

      <CTABanner
        locale={locale}
        title={dict.home.ctaTitle}
        body={dict.home.ctaBody}
        button={dict.home.ctaButton}
      />
    </>
  );
}
