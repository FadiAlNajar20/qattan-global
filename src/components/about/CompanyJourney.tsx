"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../ui/Container";

interface JourneyMilestoneData {
  year: string;
  title: string;
  description: string;
}

interface CompanyJourneyProps {
  content: JourneyMilestoneData[];
}

function JourneyMilestone({
  item,
  isLeft,
}: {
  item: JourneyMilestoneData;
  index: number;
  isLeft: boolean;
}) {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 last:mb-0 group">
      {/* Center Line Dot */}
      <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-5 h-5 rounded-full bg-[var(--color-bg-light)] border-4 border-[var(--color-accent)] shadow-sm z-10 transition-all duration-300 group-hover:scale-125 group-hover:bg-[var(--color-accent)]" />

      {/* Year Side */}
      <div
        className={`w-full md:w-5/12 flex flex-col justify-center ${
          isLeft
            ? "md:items-end text-left md:text-right"
            : "md:items-start text-left"
        } relative z-10 pl-16 md:pl-0 pt-5 md:pt-0 mb-6 md:mb-0`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${isLeft ? "md:pr-12" : "md:pl-12"}`}
        >
          <span className="text-[var(--color-accent)] font-black text-2xl md:text-3xl lg:text-4xl tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity duration-300 block drop-shadow-sm">
            {item.year}
          </span>
        </motion.div>
      </div>

      {/* Card Side */}
      <div
        className={`w-full md:w-5/12 relative z-10 pl-16 md:pl-0 ${
          isLeft ? "md:order-last" : "md:order-first"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--color-bg-light)] p-8 md:p-10 rounded-2xl shadow-sm border border-[var(--color-border-light)] hover:shadow-xl hover:-translate-y-1 transition-all duration-400 w-full relative overflow-hidden"
        >
          {/* Subtle accent line on top of card */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-accent)]/40 to-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4 tracking-tight group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-[var(--color-text-dark-soft)] text-lg leading-relaxed font-light">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function CompanyJourney({ content }: CompanyJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-[var(--color-bg-light)] overflow-hidden">
      <Container className="section-spacing">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-black text-[var(--color-text-dark)] mb-6 tracking-tight">
              Journey from 1951 to Today
            </h2>
            <div className="w-20 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto" ref={containerRef}>
          {/* Main vertical line (background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-border)] transform -translate-x-1/2" />

          {/* Progress line (animated) */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-[var(--color-accent)] transform -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="relative py-10">
            {content.map((item, index) => (
              <JourneyMilestone
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
