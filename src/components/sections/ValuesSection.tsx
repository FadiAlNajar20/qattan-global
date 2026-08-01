"use client";

import type { Value } from "@/types";
import Container from "@/components/ui/Container";
import {
  FadeIn,
  StaggerChildren,
  fadeUpItem,
} from "@/components/motion/FadeIn";
import { motion } from "framer-motion";
import { ShieldCheck, Award, TrendingUp, Users, History } from "lucide-react";

interface Props {
  eyebrow: string;
  title: string;
  values: Value[];
}

const iconMap = [ShieldCheck, Award, TrendingUp, Users, History];
const spanMap = [
  "lg:col-span-3", // 1. Trust & Authenticity
  "lg:col-span-3", // 2. Quality & Excellence
  "lg:col-span-2", // 3. Innovation & Expansion
  "lg:col-span-2", // 4. Customer-Centric
  "lg:col-span-2", // 5. Heritage & Legacy
];

export default function ValuesSection({ eyebrow, title, values }: Props) {
  return (
    <section className="bg-[var(--color-bg-light)] py-24 sm:py-32">
      <Container>
        <FadeIn className="max-w-3xl mb-16">
          <p className="text-[var(--color-text-sub-above)] font-semibold tracking-widest uppercase text-xs mb-4">
            {eyebrow || "WHAT WE STAND FOR"}
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-[var(--color-text-dark)] tracking-tight">
            {title || "Principles that define every decision."}
          </h2>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
          staggerDelay={0.07}
        >
          {values.map((value, i) => {
            const Icon = iconMap[i] || ShieldCheck;
            const spanClass = spanMap[i] || "lg:col-span-2";

            return (
              <motion.article
                key={value.title}
                variants={fadeUpItem}
                className={`group bg-gradient-to-br from-[var(--color-bg-light)] to-[var(--color-bg-light-dim)]/60 border border-[var(--color-border-light)] rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 flex flex-col justify-between ${spanClass}`}
              >
                <div>
                  {/* Top Header & Icon Row */}
                  <div className="flex items-start justify-between mb-8">
                    {/* The Top Indicator Line */}
                    <div className="w-8 h-[2px] bg-[var(--color-accent)] transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--color-accent)] mt-2" />

                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--color-bg-light-dim)] border border-[var(--color-border-light)] transition-colors duration-300 group-hover:bg-[var(--color-accent)]/10 group-hover:border-[var(--color-accent)]/40">
                      <Icon
                        className="w-6 h-6 text-[var(--color-accent)] transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-[var(--color-text-dark)] text-xl mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
