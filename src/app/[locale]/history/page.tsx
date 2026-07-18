import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/sections/Timeline";
import { FadeIn } from "@/components/motion/FadeIn";
import CountUp from "@/components/motion/CountUp";
import CTABanner from "@/components/sections/CTABanner";
import Image from "next/image";

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
    path: "history",
    title: dict.history.heroTitle,
    description: dict.history.heroSubtitle,
    siteName: dict.meta.siteName,
  });
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const h = dict.history;

  return (
    <>
      {/* Hero */}
      <section className=" pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            fill
            src="/images/history.webp"
            alt=""
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10">
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
                  {dict.nav.history}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {h.heroEyebrow}
            </p>
            <h1 className="font-bold text-white text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight max-w-3xl">
              {h.heroTitle}
            </h1>
            <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl">
              {h.heroSubtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Full Timeline */}
      <section className="bg-white">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <FadeIn>
                <SectionHeading
                  eyebrow={h.timelineEyebrow}
                  title={h.timelineTitle}
                />
              </FadeIn>
            </div>
            <div className="lg:col-span-2">
              <Timeline
                eyebrow=""
                title=""
                milestones={h.milestones}
                compact={false}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Infrastructure */}
      <section className="bg-[var(--color-bg-light-dim)]">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <SectionHeading
                eyebrow={h.infraEyebrow}
                title={h.infraTitle}
                description={h.infraBody}
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {h.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 bg-white border border-[var(--color-border-light)] rounded-xl"
                  >
                    <div
                      className="font-bold text-[var(--color-text-dark)] tabular-nums leading-none mb-2"
                      style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                    >
                      <CountUp
                        target={
                          parseInt(stat.value.replace(/[^0-9]/g, ""), 10) || 0
                        }
                        suffix={stat.suffix ?? ""}
                      />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
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
