import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/types";
import type { Locale } from "@/types";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function Footer({ dict, locale }: Props) {
  const year = new Date().getFullYear();
  const copyright = dict.footer.copyright.replace("{year}", String(year));

  // const corporateLinks = [
  //   { label: dict.nav.history, href: `/${locale}/history` },
  //   // { label: dict.nav.sectors, href: `/${locale}/sectors` },
  //   { label: dict.nav.partners, href: `/${locale}/partners` },
  // ];

  const discoverLinks = [
    { label: dict.nav.brands, href: `/${locale}/global-partnerships` },
    { label: dict.nav.about, href: `/${locale}/about` },
    // { label: dict.nav.gallery, href: `/${locale}/gallery` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
    {
      label: dict.nav.qattanglobalStore,
      href: `/${locale}/store`,
    },
  ];

  return (
    <footer className="bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-t border-[var(--color-border)]/50">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Section 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-6 pr-0 lg:pr-8">
            <Link
              href={`/${locale}`}
              aria-label={dict.aria?.logo || "Qattan Global Home"}
              className="inline-block"
            >
              <Image
                src="/images/logo.webp"
                alt="Qattan Global"
                width={160}
                height={48}
                className="h-12 w-auto brightness-0 invert opacity-95"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-[var(--color-text-muted)]">
              {dict.footer.richTagline}
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a
                href="https://www.facebook.com/kattan.global"
                aria-label="Facebook"
                target="_blank"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/qattan.global"
                aria-label="Instagram"
                target="_blank"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Section 2: Discover Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              {dict.footer.discover}
            </h3>
            <ul role="list" className="space-y-3.5">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200 inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-bg-light)] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Headquarters */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              {dict.footer.headquarters}
            </h3>
            <address className="not-italic space-y-4 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-[var(--color-text-muted)] mt-0.5"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{dict.footer.ammanJordan}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-[var(--color-text-muted)]"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:+962797090660"
                  className="hover:text-[var(--color-text-primary)] transition-colors"
                  dir="ltr"
                >
                  +962 79 709 0660
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-[var(--color-text-muted)]"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href="mailto:contact@qattanglobal.com"
                  className="hover:text-[var(--color-text-primary)] transition-colors"
                >
                  contact@qattanglobal.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            {copyright}{" "}
            <Link
              href="https://esafqa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-secondary)] transition-colors underline cursor-pointer"
            >
              <span className="text-sm text-[var(--color-text-muted)]">
                Developed by Esafqa
              </span>
            </Link>
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-[var(--color-text-secondary)] transition-colors"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-[var(--color-text-secondary)] transition-colors"
            >
              {dict.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
