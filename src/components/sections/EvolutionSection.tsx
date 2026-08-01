"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import { motion, useInView, Variants } from "framer-motion";

interface Era {
  year: string;
  tag: string;
  title: string;
  description: string;
}

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  eras: Era[];
}

const leftVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
  visible: {
    clipPath: "inset(-20% 0 -20% 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const nodeVariants: Variants = {
  hidden: (isRtl: boolean) => ({
    opacity: 0,
    x: isRtl ? -60 : 60,
    filter: "blur(12px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EvolutionSection({
  eyebrow,
  title,
  description,
  eras,
}: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isRtl = locale === "ar";

  return (
    <section className="bg-[var(--color-bg-light-dim)] py-24 sm:py-32 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Sticky Headers) */}
          <div className="lg:col-span-4 relative">
            <motion.div
              className="lg:sticky lg:top-32 h-fit"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={leftVariants}
            >
              <p className="text-[var(--color-text-sub-above)] font-semibold tracking-widest uppercase text-xs mb-4">
                {eyebrow}
              </p>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-[var(--color-text-dark)] tracking-tight leading-[1.1] mb-6">
                {title}
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>

          {/* Right Column (Interactive Timeline Stream) */}
          <div className="lg:col-span-8 relative">
            {/* The Track Container */}
            <div className="relative ltr:border-l-2 rtl:border-r-2 border-[var(--color-border-light)] ltr:pl-8 md:ltr:pl-12 ltr:ml-4 rtl:pr-8 md:rtl:pr-12 rtl:mr-4">
              {/* The Glowing Progress Track - using viewport triggers */}
              <motion.div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4BA8A] to-[#D4BA8A] ltr:-left-[2px] rtl:-right-[2px] origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="flex flex-col">
                {eras.map((era, index) => (
                  <motion.div
                    key={index}
                    custom={isRtl}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={nodeVariants}
                  >
                    <TimelineNode
                      era={era}
                      isLast={index === eras.length - 1}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TimelineNode({ era, isLast }: { era: Era; isLast: boolean }) {
  const ref = useRef(null);
  // Trigger active state when block crosses the middle of the viewport
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <div
      ref={ref}
      className={`group relative ${isLast ? "mb-0 pb-4" : "mb-16 pb-4"}`}
    >
      {/* Node Indicator */}
      <div
        className={`absolute top-2 -translate-y-1/2 rounded-full transition-all duration-300 ltr:-left-8 md:ltr:-left-12 ltr:-translate-x-[calc(50%+1px)] rtl:-right-8 md:rtl:-right-12 rtl:translate-x-[calc(50%+1px)] z-10 ${
          isInView
            ? "bg-[var(--color-accent)] w-5 h-5 ring-4 ring-[var(--color-accent)]/20"
            : "bg-[var(--color-border-light)] w-4 h-4"
        }`}
      />

      <div
        className={`transition-all duration-700 ease-out transform ${
          isInView
            ? "opacity-100 translate-y-0 blur-none"
            : "opacity-40 translate-y-4 blur-[1px]"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block text-xs font-semibold tracking-wider text-[var(--color-accent)] uppercase">
            {era.tag}
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border-light)]" />
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            {era.year}
          </span>
        </div>
        <h3
          className={`text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold mb-4 tracking-tight transition-colors duration-500 ${
            isInView
              ? "text-[var(--color-text-dark)]"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          {era.title}
        </h3>
        <p className="text-[var(--color-text-muted)] leading-relaxed text-lg max-w-2xl">
          {era.description}
        </p>
      </div>
    </div>
  );
}
