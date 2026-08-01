import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

import AboutHero from "@/components/about/AboutHero";
// import AboutOverview from "@  /components/about/AboutOverview";
import CompanyJourney from "@/components/about/CompanyJourney";
import QattanToday from "@/components/about/QattanToday";
import BrandEcosystemPreview from "@/components/about/BrandEcosystemPreview";
import MissionVision from "@/components/about/MissionVision";
// import ValuesBento from "@/components/about/ValuesBento";
import InfrastructurePeople from "@/components/about/InfrastructurePeople";
// import SisterCompany from "@/components/about/SisterCompany";
// import AboutFinalCTA from "@/components/about/AboutFinalCTA";
import CTABanner from "@/components/sections/CTABanner";
import ValuesSection from "@/components/sections/ValuesSection";

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
  const content = dict.aboutRedesign;

  return buildMetadata({
    locale,
    path: "about",
    title: `${dict.nav.about}`,
    description: content.hero.supportingText,
    siteName: dict.meta.siteName,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const content = dict.aboutRedesign;
  const h = dict.home;

  return (
    <>
      <AboutHero content={content.hero} />
      {/* <AboutOverview content={content.overview} /> */}
      <CompanyJourney content={content.journey} />
      <QattanToday content={content.currentScale} />
      <BrandEcosystemPreview content={content.brandPreview} locale={locale} />
      <MissionVision
        content={{ mission: content.mission, vision: content.vision }}
      />
      {/* <ValuesBento content={content.values} /> */}
      <ValuesSection
        eyebrow={h.valuesEyebrow}
        title={h.valuesTitle}
        values={h.values}
      />
      <InfrastructurePeople content={content.infrastructure} />
      {/* <SisterCompany content={content.sisterCompany} /> */}
      {/* <AboutFinalCTA content={content.finalCta} locale={locale} /> */}

      <CTABanner
        locale={locale}
        title={h.ctaTitle}
        body={h.ctaBody}
        button={h.ctaButton}
      />
    </>
  );
}
