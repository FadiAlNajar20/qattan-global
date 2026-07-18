"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/types";
import type { Locale } from "@/types";
import { getAlternateLocale } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function Navigation({ dict, locale }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const altLocale = getAlternateLocale(locale);

  // Compute alternate locale path for language switcher
  const altPath = pathname.replace(`/${locale}`, `/${altLocale}`);

  // Determine if the navigation should force the solid/light-background theme
  const isLightPage = pathname.includes("/contact");
  const isSolidTheme = scrolled || isLightPage;

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    // { label: dict.nav.home, href: `/${locale}` },
    // { label: dict.nav.about, href: `/${locale}/about` },
    // { label: dict.nav.history, href: `/${locale}/history` },
    { label: dict.nav.brands, href: `/${locale}/brands` },
    // { label: dict.nav.sectors, href: `/${locale}/sectors` },
    // { label: dict.nav.partners, href: `/${locale}/partners` },
    // { label: dict.nav.gallery, href: `/${locale}/gallery` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
    { label: dict.nav.qattanglobalStore, href: `https://qattanglobal.com` },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        role="banner"
        className={[
          "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-all duration-500",
          isSolidTheme
            ? "bg-white/95 backdrop-blur-md border-b border-[var(--color-border-light)] shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container-qg">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between h-16 md:h-20"
          >
            {/* Logo */}
            <Link
              href={`/${locale}`}
              aria-label={dict.aria.logo}
              className="flex-shrink-0 relative z-10"
            >
              <Image
                src="/images/logo.webp"
                alt="Qattan Global"
                width={160}
                height={48}
                priority
                className={[
                  "w-auto h-auto transition-all duration-300",
                  !isSolidTheme ? "brightness-0 invert" : "",
                ].join(" ")}
              />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={isActive(item.href) ? "true" : undefined}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={[
                      "nav-link-underline px-3 py-2 text-sm font-medium transition-colors duration-200",
                      isSolidTheme
                        ? "text-[var(--color-text-dark)] hover:text-[var(--color-text-dark-soft)]"
                        : "text-white/90 hover:text-white",
                    ].join(" ")}
                    target={
                      item.href === "https://qattanglobal.com"
                        ? "_blank"
                        : "_self"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <Link
                href={altPath}
                aria-label={dict.aria.langSwitcher}
                className={[
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isSolidTheme
                    ? "text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light-dim)]"
                    : "text-white/90 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                <Globe
                  size={15}
                  aria-hidden="true"
                  className={
                    isSolidTheme
                      ? "text-[var(--color-text-muted)]"
                      : "text-white/70"
                  }
                />
                <span>{altLocale === "ar" ? "العربية" : "English"}</span>
              </Link>

              {/* Contact CTA (desktop) */}
              <Link
                href={`/${locale}/contact`}
                className={[
                  "hidden lg:inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200",
                  isSolidTheme
                    ? "bg-[var(--color-text-dark)] text-white hover:bg-[var(--color-text-dark-soft)]"
                    : "bg-white text-[var(--color-text-dark)] hover:bg-white/90",
                ].join(" ")}
              >
                {dict.nav.contact}
              </Link>

              {/* Mobile menu toggle */}
              <button
                ref={toggleRef}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
                onClick={() => setMenuOpen(!menuOpen)}
                className={[
                  "lg:hidden flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200",
                  isSolidTheme
                    ? "text-[var(--color-text-dark)] hover:bg-[var(--color-bg-light-dim)]"
                    : "text-white hover:bg-white/10",
                ].join(" ")}
              >
                {menuOpen ? (
                  <X size={22} aria-hidden="true" />
                ) : (
                  <Menu size={22} aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Panel */}
            <motion.div
              key="panel"
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: locale === "ar" ? -320 : 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: locale === "ar" ? -320 : 320, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className={[
                "fixed top-0 bottom-0 z-[95] w-80 bg-white shadow-xl lg:hidden flex flex-col",
                locale === "ar" ? "left-0" : "right-0",
              ].join(" ")}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-border-light)]">
                <Image
                  src="/images/logo.webp"
                  alt="Qattan Global"
                  width={130}
                  height={40}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label={dict.nav.closeMenu}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-bg-light-dim)] transition-colors"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto px-4 py-6"
              >
                <ul role="list" className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={[
                          "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150",
                          isActive(item.href)
                            ? "bg-[var(--color-bg-light-dim)] text-[var(--color-text-dark)] font-semibold"
                            : "text-[var(--color-text-dark-soft)] hover:bg-[var(--color-bg-light-dim)] hover:text-[var(--color-text-dark)]",
                        ].join(" ")}
                        target={
                          item.href === "https://qattanglobal.com"
                            ? "_blank"
                            : "_self"
                        }
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Panel footer */}
              <div className="px-4 py-6 border-t border-[var(--color-border-light)] space-y-3">
                <Link
                  href={`/${locale}/contact`}
                  className="flex w-full items-center justify-center px-4 py-3 rounded-lg bg-[var(--color-text-dark)] text-white text-sm font-semibold hover:bg-[var(--color-text-dark-soft)] transition-colors"
                >
                  {dict.nav.contact}
                </Link>
                <Link
                  href={altPath}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[var(--color-border-light)] text-sm font-medium text-[var(--color-text-dark-soft)] hover:bg-[var(--color-bg-light-dim)] transition-colors"
                >
                  <Globe size={14} aria-hidden="true" />
                  {altLocale === "ar" ? "العربية" : "English"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
