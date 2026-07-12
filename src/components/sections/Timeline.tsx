"use client";

import type { TimelineMilestone } from "@/types";
import {
  FadeIn,
  StaggerChildren,
  fadeUpItem,
} from "@/components/motion/FadeIn";
import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  milestones: TimelineMilestone[];
  compact?: boolean;
}

export default function Timeline({
  eyebrow,
  title,
  milestones,
  compact = false,
}: Props) {
  return (
    <div className="space-y-4">
      {eyebrow && (
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            {eyebrow}
          </p>
        </FadeIn>
      )}
      {title && (
        <FadeIn delay={0.05}>
          <h2 className="font-bold text-[var(--color-text-dark)] text-[clamp(1.75rem,3.5vw,2.75rem)] text-balance leading-tight">
            {title}
          </h2>
        </FadeIn>
      )}

      {/* Timeline */}
      <StaggerChildren
        className="timeline-track mt-10 space-y-0"
        staggerDelay={0.12}
      >
        {milestones.map((milestone) => (
          <motion.div
            key={milestone.year}
            variants={fadeUpItem}
            className="relative ps-14 pb-10 last:pb-0"
          >
            {/* Dot */}
            <div
              aria-hidden="true"
              className="absolute start-0 top-1 w-12 flex flex-col items-center"
            >
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] border-2 border-white shadow-sm ring-2 ring-[var(--color-accent)]/30" />
            </div>

            {/* Year */}
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              {milestone.year}
            </span>

            {/* Content */}
            <h3 className="font-bold text-[var(--color-text-dark)] text-lg mb-2">
              {milestone.title}
            </h3>
            {!compact && (
              <p className="text-[var(--color-text-dark-soft)] text-sm leading-relaxed max-w-prose">
                {milestone.body}
              </p>
            )}
          </motion.div>
        ))}
      </StaggerChildren>
    </div>
  );
}
