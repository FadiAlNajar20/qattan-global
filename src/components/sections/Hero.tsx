"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import type { Dictionary } from "@/types";
import type { Locale } from "@/types";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export default function Hero({ dict, locale }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const h = dict.home;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden bg-[var(--color-bg-primary)]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Gattan Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-qg w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: Main content */}
          <motion.div
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-6"
            >
              {h.heroEyebrow}
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-[1.08] mb-6"
            >
              {h.heroTitle}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-white/90 leading-relaxed max-w-7xl mb-10"
            >
              {h.heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="relative z-20 flex flex-wrap gap-3"
            >
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-text-dark-deep)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] cursor-pointer"
              >
                {h.heroPrimary}
                <ArrowRight size={16} aria-hidden="true" className="icon-dir" />
              </Link>
              <Link
                href={`/${locale}/brands`}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] cursor-pointer"
              >
                {h.heroSecondary}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Est. card */}
          <motion.div
            className="lg:col-span-4 lg:text-end"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block border border-white/15 rounded-xl p-5 backdrop-blur-sm bg-white/5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
                {h.heroEst}
              </p>
              <p
                className="font-bold text-[var(--color-accent)] tabular-nums"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {h.heroStat}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Amman, Jordan
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-0 inset-x-0 container-qg flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <a
            href="#overview"
            aria-label={h.heroScrollLabel}
            className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group"
          >
            <span className="text-[10px] uppercase tracking-widest">
              Scroll DOWN
            </span>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown size={16} aria-hidden="true" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
