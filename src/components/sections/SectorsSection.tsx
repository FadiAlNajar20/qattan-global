"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  FadeIn,
  StaggerChildren,
  fadeUpItem,
} from "@/components/motion/FadeIn";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Package,
  Truck,
  Globe,
  Home,
  Sparkles,
  Tag,
  Star,
} from "lucide-react";
import type { Sector } from "@/types";

const iconMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>
> = {
  ShoppingBag,
  Package,
  Truck,
  Globe,
  Home,
  Sparkles,
  Tag,
  Star,
};

interface Props {
  eyebrow: string;
  title: string;
  sectors: Sector[];
}

export default function SectorsSection({ eyebrow, title, sectors }: Props) {
  return (
    <section className="bg-[var(--color-bg-light)]">
      <Container className="section-spacing">
        <FadeIn>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </FadeIn>

        <StaggerChildren
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          staggerDelay={0.06}
        >
          {sectors?.map((sector) => {
            const Icon = iconMap[sector.icon] ?? ShoppingBag;
            return (
              <motion.article
                key={sector.title}
                variants={fadeUpItem}
                className="p-6 border border-[var(--color-border-light)] rounded-xl bg-white group hover:bg-[var(--color-bg-primary)] hover:border-[var(--color-border)] transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 mb-5 flex items-center justify-center rounded-lg bg-[var(--color-bg-light-dim)] group-hover:bg-white/10 transition-colors duration-300">
                  <Icon
                    size={18}
                    aria-hidden="true"
                    className="text-[var(--color-text-dark)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                  />
                </div>
                <h3 className="font-bold text-[var(--color-text-dark)] group-hover:text-white text-base mb-2 transition-colors duration-300">
                  {sector.title}
                </h3>
                <p className="text-sm text-[var(--color-text-dark-soft)] group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                  {sector.description}
                </p>
              </motion.article>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
