import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

// Component Imports
import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import SectorsSection from "@/components/sections/SectorsSection";
import BrandsSection from "@/components/sections/BrandsSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import EvolutionSection from "@/components/sections/EvolutionSection";
import MissionVision from "@/components/sections/MissionVision";
import ValuesSection from "@/components/sections/ValuesSection";
import RetailersTrustSection from "@/components/sections/RetailersTrustSection";
import CTABanner from "@/components/sections/CTABanner";

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
    <main className="flex flex-col w-full overflow-hidden">
      {/* 1. Cinematic Hero / Baseline Hook */}
      <Hero dict={dict} locale={locale} />

      {/* MetricsBlock (Company overview + statistics) */}
      <StatsSection
        eyebrow={h.overviewEyebrow}
        title={h.overviewTitle}
        description={h.overviewBody}
        stats={h.statsCards}
      />

      {/* 2. IndustriesSection (Bento Grid) - Moved up for immediate commercial impact */}
      <SectorsSection
        eyebrow={h.sectorsEyebrow}
        title={h.sectorsTitle}
        sectors={dict.sectors.sectors}
      />

      {/* 3. BrandsPortfolio (Grayscale-to-Color Logo Matrix) */}
      <BrandsSection
        eyebrow={h.brandsEyebrow}
        title={h.brandsTitle}
        description={h.brandsBody}
        ctaText={h.brandsCta}
        tiers={dict.brands.tiers}
      />

      {/* 4. DifferentiatorsSection (What Sets Us Apart - Split Sticky Scroll) */}
      <DifferentiatorsSection
        eyebrow={h.whyEyebrow}
        title={h.whyTitle}
        description={h.whyBody}
        differentiators={h.whyPoints}
      />

      {/* 5. EvolutionSection (Seven Decades of Evolution Vertical Timeline) */}
      <EvolutionSection
        eyebrow={h.evolution.eyebrow}
        title={h.evolution.title}
        description={h.evolution.description}
        eras={h.evolution.eras}
      />

      {/* 6. MissionVisionPrinciples (Asymmetric Editorial Grid & Core Values) */}
      <MissionVision
        missionEyebrow={h.missionEyebrow}
        missionTitle={h.missionTitle}
        missionBody={h.missionBody}
        missionCta={h.missionCta}
        visionEyebrow={h.visionEyebrow}
        visionTitle={h.visionTitle}
        visionPoints={h.visionPoints}
      />
      
      <ValuesSection
        eyebrow={h.valuesEyebrow}
        title={h.valuesTitle}
        values={h.values}
      />

      {/* 7. RetailersTrustSection (Trusted by Jordan's Leading Retailers) */}
      <RetailersTrustSection
        eyebrow={h.partnersEyebrow}
        title={h.partnersTitle}
        description="Direct nationwide distribution infrastructure serving 500+ premium points of sale across the region."
      />

      {/* 8. CallToAction & RichFooter (Closing loop) */}
      <CTABanner
        locale={locale}
        title={h.ctaTitle}
        body={h.ctaBody}
        button={h.ctaButton}
      />
    </main>
  );
}
