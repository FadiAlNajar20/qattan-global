"use client";

import type { Stat } from "@/types";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerChildren,
  fadeUpItem,
} from "@/components/motion/FadeIn";
import { motion } from "framer-motion";
import CountUp from "@/components/motion/CountUp";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  stats: Stat[];
  light?: boolean;
}

// Extract numeric value from stat string like "70+" or "1,000" or "6,500"
function parseStatValue(value: string): {
  num: number;
  prefix: string;
  suffix: string;
} {
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  return {
    prefix: match[1] || "",
    num: parseInt(match[2], 10),
    suffix: match[3] || "",
  };
}

function StatCard({ stat, light }: { stat: Stat; light?: boolean }) {
  const { num, prefix, suffix: parsedSuffix } = parseStatValue(stat.value);
  const displaySuffix = stat.suffix ?? parsedSuffix;

  return (
    <motion.div
      variants={fadeUpItem}
      className={[
        "relative p-6 md:p-8 rounded-xl border",
        light
          ? "border-white/10 bg-white/5"
          : "border-[var(--color-border-light)] bg-white",
      ].join(" ")}
    >
      <div
        className={[
          "font-bold leading-none tabular-nums mb-3",
          "text-[clamp(1.5rem,3.5vw,2.25rem)]",
          light ? "text-white" : "text-[var(--color-text-dark)]",
        ].join(" ")}
      >
        {prefix}
        <CountUp target={num} suffix={displaySuffix} />
      </div>
      <p
        className={[
          "text-sm font-medium",
          light ? "text-white/90" : "text-[var(--color-text-muted)]",
        ].join(" ")}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection({
  eyebrow,
  title,
  description,
  stats,
  light = false,
}: Props) {
  return (
    <section
      id="overview"
      className={
        light ? "bg-[var(--color-bg-secondary)]" : "bg-[var(--color-bg-light)]"
      }
    >
      <Container className="section-spacing">
        <FadeIn>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </FadeIn>
        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} light={light} />
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
