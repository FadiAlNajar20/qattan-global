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
    path: "global-partnerships",
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
      <section className="min-h-[80vh] flex flex-col justify-center pt-32 pb-16 relative overflow-hidden bg-[var(--color-bg-primary)]">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="https://2021-2025.state.gov/wp-content/uploads/2019/05/Global_Partnerships.jpg"
            alt="Global Partnerships"
            fill
            unoptimized
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[var(--color-text-dark)]/40" />
        </div>
        <Container className="relative z-10 flex flex-col h-full mt-auto">
          <div className="flex-1 flex flex-col justify-center max-w-4xl pt-16">
            <FadeIn>
              <div className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 font-semibold text-[var(--color-text-sub-above)]">
                {b.heroEyebrow}
              </div>
              <h1 className="text-[clamp(1.5rem,3.5vw,2.25rem)] mb-6 md:mb-8 leading-[1.15] font-serif tracking-tight text-[var(--color-text-primary)] drop-shadow-sm">
                {b.heroTitle}
              </h1>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg max-w-2xl font-medium drop-shadow-sm">
                {b.heroSubtitle}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>
      {/* التصميم الجديد كلياً: شبكة البطاقات الفاخرة */}
      <section className="bg-gray-50/50">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {b.tiers.map((tier, ti) => (
              <FadeIn
                key={tier.title}
                delay={ti * 0.15}
                className="rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative overflow-hidden group"
              >
                {/* رقم جمالي ضخم في خلفية البطاقة */}
                <div className="absolute -top-8 -right-4 text-[12rem] font-black text-gray-50 group-hover:text-amber-50/60 transition-colors duration-500 pointer-events-none select-none leading-none z-0">
                  {String(ti + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* العنوان الفرعي كشارة (Badge) */}
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-[var(--color-text-sub-above)] text-[10px] font-black uppercase tracking-[0.2em] w-fit mb-6 border border-amber-100/50">
                    {tier.eyebrow}
                  </span>

                  {/* العنوان الرئيسي */}
                  <h2 className="font-bold text-gray-900 text-3xl leading-tight mb-4">
                    {tier.title}
                  </h2>

                  {/* الوصف */}
                  <p className="text-gray-500 text-base leading-relaxed mb-10 flex-grow">
                    {tier.description}
                  </p>

                  {/* قائمة العلامات التجارية على شكل (Chips) عصرية */}
                  <div className="flex flex-wrap gap-2.5 mt-auto border-t border-gray-50 pt-6">
                    {tier.brands.map((brand) => (
                      <span
                        key={brand.name}
                        className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all duration-300 cursor-default"
                      >
                        {brand.name}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
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
                      className="max-h-20 w-auto h-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
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
