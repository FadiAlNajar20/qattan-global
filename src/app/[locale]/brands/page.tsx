import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerChildren,
  FadeInStaggerItem,
} from "@/components/motion/FadeIn";
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
    path: "brands",
    title: dict.brands.heroTitle,
    description: dict.brands.heroSubtitle,
    siteName: dict.meta.siteName,
  });
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const b = dict.brands;

  // Group logos by category
  const perfumeBrands = brandLogos
    .filter((l) => l.category === "perfume")
    .slice(0, 20);
  const applianceBrands = brandLogos.filter((l) => l.category === "appliance");
  const skincareBrands = brandLogos.filter((l) => l.category === "skincare");
  const cosmeticsBrands = brandLogos.filter((l) => l.category === "cosmetics");

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-primary)] pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 30% 60%, rgba(200,191,176,0.07), transparent 70%)",
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
                  {dict.nav.brands}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {b.heroEyebrow}
            </p>
            <h1 className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight max-w-3xl">
              {b.heroTitle}
            </h1>
            <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl">
              {b.heroSubtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* 3 Brand tiers */}
      <section className="bg-white">
        <Container className="section-spacing">
          <div className="space-y-20">
            {b.tiers.map((tier, ti) => (
              <div
                key={tier.title}
                className={[
                  "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                  ti % 2 !== 0 ? "lg:grid-flow-row-dense" : "",
                ].join(" ")}
              >
                <FadeIn className={ti % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                    {tier.eyebrow}
                  </span>
                  <h2
                    className="font-bold text-[var(--color-text-dark)] text-balance mt-3 mb-4 leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {tier.title}
                  </h2>
                  <p className="text-[var(--color-text-dark-soft)] leading-relaxed mb-6">
                    {tier.description}
                  </p>
                  <ul className="space-y-2" role="list">
                    {tier.brands.map((brand) => (
                      <li
                        key={brand.name}
                        className="flex items-center gap-3 py-2 border-b border-[var(--color-border-light)] last:border-0"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0"
                        />
                        <span className="font-semibold text-[var(--color-text-dark)]">
                          {brand.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
                <FadeIn
                  delay={0.12}
                  className={
                    ti % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""
                  }
                >
                  <div className="aspect-[4/3] bg-[var(--color-bg-light-dim)] rounded-xl border border-[var(--color-border-light)] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-5xl font-bold text-[var(--color-border-light)] select-none">
                        {String(ti + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {tier.eyebrow}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Showroom brands by category */}
      <section className="bg-[var(--color-bg-light-dim)]">
        <Container className="section-spacing">
          <FadeIn>
            <SectionHeading
              eyebrow={b.showroomsEyebrow}
              title={b.showroomsTitle}
              description={b.showroomsBody}
            />
          </FadeIn>

          {[
            { label: "Perfumes", logos: perfumeBrands },
            { label: "Home Appliances", logos: applianceBrands },
            { label: "Skincare", logos: skincareBrands },
            { label: "Cosmetics", logos: cosmeticsBrands },
          ].map(({ label, logos }) => (
            <div key={label} className="mt-14">
              <FadeIn>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-6 border-b border-[var(--color-border-light)] pb-3">
                  {label}
                </h3>
              </FadeIn>
              <StaggerChildren
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                staggerDelay={0.04}
              >
                {logos.map((brand) => (
                  <FadeInStaggerItem
                    key={brand.name}
                    className="flex items-center justify-center h-24 bg-white border-2 border-[var(--color-border-light)] rounded-xl px-4 hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-200"
                    title={brand.name}
                  >
                    <Image
                      src={brand.url}
                      alt={brand.name}
                      width={120}
                      height={54}
                      className="max-h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      unoptimized
                    />
                  </FadeInStaggerItem>
                ))}
              </StaggerChildren>
            </div>
          ))}
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
