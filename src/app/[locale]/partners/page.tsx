import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    path: "partners",
    title: dict.partners.heroTitle,
    description: dict.partners.heroSubtitle,
    siteName: dict.meta.siteName,
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.partners;

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-primary)] pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 20% 60%, rgba(200,191,176,0.07), transparent 70%)",
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
                  {dict.nav.partners}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {p.heroEyebrow}
            </p>
            <h1 className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight max-w-3xl">
              {p.heroTitle}
            </h1>
            <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl">
              {p.heroSubtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Sister company */}
      <section className="bg-white">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <SectionHeading
                eyebrow={p.sisterEyebrow}
                title={p.sisterTitle}
                description={p.sisterBody}
              />
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="p-8 bg-[var(--color-bg-light-dim)] border border-[var(--color-border-light)] rounded-2xl">
                <div className="space-y-4">
                  <div className="w-12 h-px bg-[var(--color-accent)]" />
                  <p className="text-sm text-[var(--color-text-muted)] font-semibold uppercase tracking-widest">
                    Founded 1950
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-dark)]">
                    Juma for Trading
                  </p>
                  <p className="text-sm text-[var(--color-text-dark-soft)] leading-relaxed">
                    {p.sisterBody}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Key accounts */}
      <section className="bg-[var(--color-bg-light-dim)]">
        <Container className="section-spacing">
          <FadeIn>
            <SectionHeading
              eyebrow={p.accountsEyebrow}
              title={p.accountsTitle}
              description={p.accountsBody}
            />
          </FadeIn>

          <StaggerChildren
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.08}
          >
            {p.accounts.map((account) => (
              <FadeInStaggerItem
                key={account.name}
                className="p-7 bg-white border border-[var(--color-border-light)] rounded-xl hover:border-[var(--color-accent)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-8 h-px bg-[var(--color-accent)] mb-5" />
                <h3 className="font-bold text-[var(--color-text-dark)] text-xl mb-1">
                  {account.name}
                </h3>
                {account.note && (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {account.note}
                  </p>
                )}
              </FadeInStaggerItem>
            ))}
          </StaggerChildren>
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
