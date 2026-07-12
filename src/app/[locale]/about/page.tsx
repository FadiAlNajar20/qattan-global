import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MissionVision from "@/components/sections/MissionVision";
import ValuesSection from "@/components/sections/ValuesSection";
import { FadeIn } from "@/components/motion/FadeIn";
import CountUp from "@/components/motion/CountUp";
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
    path: "about",
    title: dict.about.heroTitle,
    description: dict.about.heroSubtitle,
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
  const a = dict.about;

  return (
    <>
      {/* Page hero */}
      <section className="bg-[var(--color-bg-primary)] pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(200,191,176,0.07), transparent 70%)",
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
                <li aria-hidden="true" className="select-none">
                  /
                </li>
                <li aria-current="page" className="text-[var(--color-accent)]">
                  {dict.nav.about}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {a.heroEyebrow}
            </p>
            <h1 className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight max-w-3xl">
              {a.heroTitle}
            </h1>
            <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl">
              {a.heroSubtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeIn>
              <SectionHeading eyebrow={a.storyEyebrow} title={a.storyTitle} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-5">
                <p className="text-[var(--color-text-dark-soft)] leading-relaxed text-base border-s-2 border-[var(--color-accent)] ps-5">
                  {a.heritageLead}
                </p>
                <p className="text-[var(--color-text-dark-soft)] leading-relaxed text-base">
                  {a.storyBody}
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <MissionVision
        missionEyebrow={a.missionEyebrow}
        missionTitle={a.missionTitle}
        missionBody={a.missionBody}
        visionEyebrow={a.visionEyebrow}
        visionTitle={a.visionTitle}
        visionPoints={a.visionPoints}
      />

      {/* Values */}
      <ValuesSection
        eyebrow={a.valuesEyebrow}
        title={a.valuesTitle}
        values={a.values}
      />

      {/* Scale / Infrastructure */}
      <section className="bg-[var(--color-bg-primary)]">
        <Container className="section-spacing">
          <FadeIn>
            <SectionHeading
              eyebrow={a.scaleEyebrow}
              title={a.scaleTitle}
              light
            />
          </FadeIn>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {a.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 border border-[var(--color-border)] rounded-xl bg-white/5 text-center"
              >
                <div
                  className="font-bold text-white tabular-nums leading-none mb-2"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  <CountUp
                    target={
                      parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 0
                    }
                    suffix={stat.suffix ?? ""}
                  />
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
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
