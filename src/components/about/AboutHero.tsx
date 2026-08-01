"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Image from "next/image";

interface AboutHeroProps {
  content: {
    eyebrow: string;
    headline: string;
    supportingText: string;
    primaryCta?: string;
    secondaryCta?: string;
    stats?: {
      number: string;
      title: string;
      subtitle: string;
    }[];
  };
}

export default function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center pt-32 pb-16 relative overflow-hidden bg-[var(--color-bg-light-dim)]">
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover"
          src="/images/about.webp"
          alt="about hero image"
          width={2000}
          height={800}
        />
        <div className="absolute inset-0 bg-[var(--color-text-dark)]/40" />
      </div>
      <Container className="relative z-10 flex flex-col h-full mt-auto">
        <div className="flex-1 flex flex-col justify-center max-w-4xl pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 font-semibold text-[var(--color-accent)]">
              {content.eyebrow}
            </div>
            <h1 className="text-[clamp(1.5rem,3.5vw,2.25rem)] mb-6 md:mb-8 leading-[1.15] font-serif tracking-tight text-[var(--color-border-light)] drop-shadow-sm">
              {content.headline}
            </h1>
            <p className="text-[var(--color-border-light)] leading-relaxed text-lg max-w-2xl font-medium drop-shadow-sm">
              {content.supportingText}
            </p>
          </motion.div>
        </div>

        {/* Glassmorphic Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-12 mb-4"
        >
          {content.stats &&
            content.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 lg:p-8 hover:bg-black/40 transition-colors"
              >
                <div className="text-3xl lg:text-4xl font-medium text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg lg:text-xl font-medium text-white mb-1">
                  {stat.title}
                </div>
                <div className="text-sm text-white/70">{stat.subtitle}</div>
              </div>
            ))}
        </motion.div>
      </Container>
    </section>
  );
}
