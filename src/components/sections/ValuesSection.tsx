"use client";

import type { Value } from "@/types";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerChildren,
  fadeUpItem,
} from "@/components/motion/FadeIn";
import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  values: Value[];
}

export default function ValuesSection({ eyebrow, title, values }: Props) {
  return (
    <section className="bg-[var(--color-bg-light)]">
      <Container className="section-spacing">
        <FadeIn>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </FadeIn>

        <StaggerChildren
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.07}
        >
          {values.map((value, i) => (
            <motion.article
              key={value.title}
              variants={fadeUpItem}
              className="relative p-7 bg-white border border-[var(--color-border-light)] rounded-xl hover:border-[var(--color-accent)] hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Index number */}
              <span
                aria-hidden="true"
                className="absolute top-6 end-6 text-4xl font-bold text-white/90 transition-colors duration-300 group-hover:text-[var(--color-accent)] tabular-nums select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-8 h-px bg-[var(--color-accent)] mb-5" />
              <h3 className="font-bold text-[var(--color-text-dark)] text-lg mb-3 pe-8">
                {value.title}
              </h3>
              <p className="text-sm text-[var(--color-text-dark-soft)] leading-relaxed">
                {value.description}
              </p>
            </motion.article>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
