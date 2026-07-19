"use client";

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
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textRevealVariants: Variants = {
    hidden: {
      clipPath: "inset(100% 0 0 0)",
      y: shouldReduceMotion ? 0 : 40,
      opacity: 0,
    },
    visible: {
      clipPath: "inset(-20% 0 -20% 0)", // Allow slight bleed for shadows
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeRevealVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cinematicRevealVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)",
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 60,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      aria-label="Hero"
      className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden bg-slate-950"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background video & fallback */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
        {/* Premium dynamic gradient overlays for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-qg w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: Main content */}
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <motion.p
              variants={textRevealVariants}
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-sub-above)] mb-6"
            >
              {h.heroEyebrow}
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={textRevealVariants}
              className="font-bold text-white text-[clamp(1.5rem,3.5vw,2.25rem)] text-balance leading-[1.08] mb-6 drop-shadow-sm"
            >
              {h.heroTitle}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={textRevealVariants}
              className="text-base md:text-lg text-slate-200 leading-relaxed max-w-7xl mb-10 drop-shadow-sm"
            >
              {h.heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeRevealVariants}
              className="relative z-20 flex flex-wrap gap-3"
            >
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-950 font-semibold rounded-md hover:bg-slate-200 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] cursor-pointer shadow-lg"
              >
                {h.heroPrimary}
                <ArrowRight size={16} aria-hidden="true" className="icon-dir" />
              </Link>
              <Link
                href={`/${locale}/brands`}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white font-semibold rounded-md hover:bg-white/10 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] cursor-pointer backdrop-blur-sm"
              >
                {h.heroSecondary}
              </Link>
            </motion.div>
          </div>

          {/* Right: Est. card */}
          <motion.div
            className="lg:col-span-4 lg:text-end"
            variants={cinematicRevealVariants}
          >
            <div className="inline-block border border-white/15 rounded-xl p-5 backdrop-blur-md bg-white/5 shadow-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                {h.heroEst}
              </p>
              <p
                className="font-bold text-[var(--color-accent)] tabular-nums drop-shadow-sm"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {h.heroStat}
              </p>
              <p className="text-xs text-slate-400 mt-1">{h.heroLocation}</p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-0 inset-x-0 flex justify-center pb-8"
        variants={fadeRevealVariants}
      >
        <a
          href="#overview"
          aria-label={h.heroScrollLabel}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-widest group-hover:text-[var(--color-accent)] transition-colors">
            {h.heroScrollText}
          </span>
          <div className="animate-bounce mt-1">
            <ArrowDown
              size={18}
              aria-hidden="true"
              className="group-hover:text-[var(--color-accent)] transition-colors"
            />
          </div>
        </a>
      </motion.div>
    </motion.section>
  );
}
