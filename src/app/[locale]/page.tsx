import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import MissionVision from "@/components/sections/MissionVision";
import ValuesSection from "@/components/sections/ValuesSection";
import Timeline from "@/components/sections/Timeline";
import SectorsSection from "@/components/sections/SectorsSection";
import BrandMarquee from "@/components/sections/BrandMarquee";
import CTABanner from "@/components/sections/CTABanner";
import {
  FadeIn,
  StaggerChildren,
  FadeInStaggerItem,
} from "@/components/motion/FadeIn";

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
    path: "",
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    siteName: dict.meta.siteName,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const h = dict.home;

  return (
    <>
      {/* 1. Cinematic Hero */}
      <Hero dict={dict} locale={locale} />

      {/* 2. Brand marquee */}
      <BrandMarquee label={h.marqueeLabel} />

      {/* 3. Company overview + statistics */}
      <StatsSection
        eyebrow={h.overviewEyebrow}
        title={h.overviewTitle}
        description={h.overviewBody}
        stats={h.stats}
      />

      {/* 4. Mission & Vision */}
      <MissionVision
        missionEyebrow={h.missionEyebrow}
        missionTitle={h.missionTitle}
        missionBody={h.missionBody}
        visionEyebrow={h.visionEyebrow}
        visionTitle={h.visionTitle}
        visionPoints={h.visionPoints}
      />

      {/* 5. Core Values */}
      <ValuesSection
        eyebrow={h.valuesEyebrow}
        title={h.valuesTitle}
        values={h.values}
      />

      {/* 6. History preview */}
      <section className="bg-white border-y border-[var(--color-border-light)]">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: heading + CTA */}
            <FadeIn className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow={h.historyEyebrow}
                title={h.historyTitle}
                description={h.historyBody}
              />
              <div className="mt-8">
                <Link
                  href={`/${locale}/history`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)] hover:text-[var(--color-text-dark-soft)] transition-colors group"
                >
                  {h.historyCta}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="icon-dir transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </div>
            </FadeIn>
            {/* Right: compact timeline */}
            <Timeline
              eyebrow=""
              title=""
              milestones={dict.history.milestones.slice(0, 3)}
              compact
            />
          </div>
        </Container>
      </section>

      {/* 7. Business Sectors */}
      <SectorsSection
        eyebrow={h.sectorsEyebrow}
        title={h.sectorsTitle}
        sectors={dict.sectors.sectors}
      />

      {/* 8. Brands highlight */}
      <section className="bg-[var(--color-bg-primary)]">
        <Container className="section-spacing">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <FadeIn>
              <SectionHeading
                eyebrow={h.brandsEyebrow}
                title={h.brandsTitle}
                description={h.brandsBody}
                light
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link
                href={`/${locale}/brands`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors group shrink-0"
              >
                {h.brandsCta}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="icon-dir transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </Link>
            </FadeIn>
          </div>

          {/* 3 brand tiers */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dict.brands.tiers.map((tier) => (
              <FadeInStaggerItem
                key={tier.title}
                className="p-6 border border-[var(--color-border)] rounded-xl bg-white/5 hover:bg-white/8 transition-colors duration-300"
              >
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold">
                  {tier.eyebrow}
                </span>
                <h3 className="font-bold text-white text-lg mt-2 mb-4">
                  {tier.title}
                </h3>
                <ul className="space-y-2" role="list">
                  {tier.brands.map((brand) => (
                    <li
                      key={brand.name}
                      className="flex items-center gap-2.5 text-sm text-white/90"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0"
                      />
                      {brand.name}
                    </li>
                  ))}
                </ul>
              </FadeInStaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* 9. Why Qattan */}
      <section className="bg-[var(--color-bg-light-dim)]">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <SectionHeading eyebrow={h.whyEyebrow} title={h.whyTitle} />
            </FadeIn>
            <StaggerChildren className="space-y-4" staggerDelay={0.06}>
              {h.whyPoints.map((point, i) => (
                <FadeInStaggerItem key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[var(--color-text-dark)]"
                  />
                  <p className="text-[var(--color-text-dark-soft)] text-base">
                    {point}
                  </p>
                </FadeInStaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </Container>
      </section>

      {/* 10. Partners mention */}
      <section className="bg-white border-y border-[var(--color-border-light)]">
        <Container className="section-spacing">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {h.partnersEyebrow}
                </p>
                <h2 className="font-bold text-[var(--color-text-dark)] text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight">
                  {h.partnersTitle}
                </h2>
              </div>
              <Link
                href={`/${locale}/partners`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)] hover:text-[var(--color-text-dark-soft)] transition-colors group shrink-0"
              >
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="icon-dir transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </Link>
            </div>
          </FadeIn>
          <StaggerChildren
            className="mt-8 flex flex-wrap gap-3"
            staggerDelay={0.08}
          >
            {dict.partners.accounts.map((account) => (
              <FadeInStaggerItem
                key={account.name}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-bg-light-dim)]"
              >
                <span className="font-semibold text-sm text-[var(--color-text-dark)]">
                  {account.name}
                </span>
                {account.note && (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {account.note}
                  </span>
                )}
              </FadeInStaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* 11. Final CTA */}
      <CTABanner
        locale={locale}
        title={h.ctaTitle}
        body={h.ctaBody}
        button={h.ctaButton}
      />
    </>
  );
}
