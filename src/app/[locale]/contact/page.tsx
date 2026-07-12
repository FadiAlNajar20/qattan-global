import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";

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
    path: "contact",
    title: dict.contact.heroTitle,
    description: dict.contact.heroSubtitle,
    siteName: dict.meta.siteName,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-primary)] pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 40% 50%, rgba(200,191,176,0.07), transparent 70%)",
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
                  {dict.nav.contact}
                </li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-4">
              {c.heroEyebrow}
            </p>
            <h1 className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-tight max-w-2xl">
              {c.heroTitle}
            </h1>
            <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-xl">
              {c.heroSubtitle}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Form + Details */}
      <section className="bg-white">
        <Container className="section-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Contact details */}
            <FadeIn>
              <div className="space-y-10">
                <div>
                  <h2 className="font-bold text-[var(--color-text-dark)] text-2xl mb-6">
                    {c.detailsTitle}
                  </h2>
                  <ul className="space-y-5" role="list">
                    <li>
                      <a
                        href="tel:+96279709066"
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-lg border border-[var(--color-border-light)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                          <Phone
                            size={16}
                            aria-hidden="true"
                            className="text-[var(--color-text-muted)]"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                            {c.phoneLabel}
                          </p>
                          <p
                            className="text-[var(--color-text-dark)] font-medium"
                            dir="ltr"
                          >
                            +962 79 709 0660
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:contact@qattanglobal.com"
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-lg border border-[var(--color-border-light)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                          <Mail
                            size={16}
                            aria-hidden="true"
                            className="text-[var(--color-text-muted)]"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                            {c.emailLabel}
                          </p>
                          <p className="text-[var(--color-text-dark)] font-medium">
                            contact@qattanglobal.com
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.qattanglobal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-lg border border-[var(--color-border-light)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                          <Globe
                            size={16}
                            aria-hidden="true"
                            className="text-[var(--color-text-muted)]"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                            {c.websiteLabel}
                          </p>
                          <p className="text-[var(--color-text-dark)] font-medium">
                            www.qattanglobal.com
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg border border-[var(--color-border-light)] flex items-center justify-center shrink-0">
                        <MapPin
                          size={16}
                          aria-hidden="true"
                          className="text-[var(--color-text-muted)]"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-0.5">
                          {c.addressLabel}
                        </p>
                        <p className="text-[var(--color-text-dark)] font-medium">
                          {c.address}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Decorative */}
                <div className="p-6 bg-[var(--color-bg-light-dim)] rounded-xl border border-[var(--color-border-light)]">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
                    Est.
                  </p>
                  <p className="font-bold text-[var(--color-text-dark)] text-4xl tabular-nums">
                    1951
                  </p>
                  <p className="text-sm text-[var(--color-text-dark-soft)] mt-1">
                    Amman, Jordan
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right: Form */}
            <FadeIn delay={0.12}>
              <div className="p-7 md:p-9 bg-[var(--color-bg-light-dim)] border border-[var(--color-border-light)] rounded-2xl">
                <h2 className="font-bold text-[var(--color-text-dark)] text-xl mb-6">
                  {c.formTitle}
                </h2>
                <ContactForm dict={dict} />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
