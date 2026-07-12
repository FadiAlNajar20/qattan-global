import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Globe } from "lucide-react";
import type { Dictionary } from "@/types";
import type { Locale } from "@/types";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function Footer({ dict, locale }: Props) {
  const year = new Date().getFullYear();
  const copyright = dict.footer.copyright.replace("{year}", String(year));

  const quickLinks = [
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.history, href: `/${locale}/history` },
    { label: dict.nav.brands, href: `/${locale}/brands` },
    { label: dict.nav.sectors, href: `/${locale}/sectors` },
    { label: dict.nav.partners, href: `/${locale}/partners` },
    { label: dict.nav.gallery, href: `/${locale}/gallery` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer
      role="contentinfo"
      className="bg-[var(--color-bg-primary)] text-white/90 relative overflow-hidden"
    >
      {/* Subtle top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-30" />

      <div className="container-qg py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href={`/${locale}`} aria-label={dict.aria.logo}>
              <Image
                src="/images/logo.webp"
                alt="Qattan Global"
                width={160}
                height={48}
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-white/90">
              {dict.footer.tagline}
            </p>
            <div className="h-px w-12 bg-[var(--color-accent)] opacity-60" />
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              {dict.footer.quickLinks}
            </h3>
            <ul role="list" className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              {dict.footer.getInTouch}
            </h3>
            <ul role="list" className="space-y-3">
              <li>
                <a
                  href="tel:+96279709066"
                  className="flex items-start gap-3 text-sm text-white/90 hover:text-[var(--color-accent)] transition-colors group"
                >
                  <Phone
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
                    aria-hidden="true"
                  />
                  <span dir="ltr">+962 79 709 0660</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@qattanglobal.com"
                  className="flex items-start gap-3 text-sm text-white/90 hover:text-[var(--color-accent)] transition-colors group"
                >
                  <Mail
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
                    aria-hidden="true"
                  />
                  <span>contact@qattanglobal.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.qattanglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/90 hover:text-[var(--color-accent)] transition-colors group"
                >
                  <Globe
                    size={15}
                    className="mt-0.5 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"
                    aria-hidden="true"
                  />
                  <span>www.qattanglobal.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            {copyright}
            <a
              href="https://esafqa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group underline"
            >
              eSafqa
            </a>
          </p>
          <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <span>Amman, Jordan</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1951</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
