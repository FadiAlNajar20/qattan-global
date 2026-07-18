"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import {
  FadeIn,
  StaggerChildren,
  fadeUpItem,
} from "@/components/motion/FadeIn";
import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  description: string;
}

const RETAILERS = [
  {
    name: "Carrefour",
    image: "/images/Carrefour.webp",
  },
  {
    name: "SmartBuy",
    image: "/images/SmartBuy.webp",
  },
  {
    name: "Leaders",
    image: "/images/Leaders.webp",
  },
  {
    name: "Darwish",
    image: "/images/Darwish.webp",
  },
  {
    name: "DNA",
    image: "/images/DNA.webp",
  },
  {
    name: "Safeway",
    image: "/images/Safeway.webp",
  },
];

export default function RetailersTrustSection({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <section className="bg-[var(--color-bg-light-dim)] py-24 sm:py-32 border-y border-[var(--color-border-light)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Context Panel */}
          <div className="lg:col-span-4">
            <FadeIn>
              {eyebrow && (
                <p className="text-amber-500/90 font-semibold tracking-widest uppercase text-xs mb-4">
                  {eyebrow}
                </p>
              )}
              <h2 className="font-bold text-slate-900 text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-tight leading-[1.1] mb-6">
                {title}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {description}
              </p>
            </FadeIn>
          </div>

          {/* Premium Grid Panel */}
          <div className="lg:col-span-8">
            <StaggerChildren
              className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
              staggerDelay={0.1}
            >
              {RETAILERS.map((retailer, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpItem}
                  className="group/partner bg-white backdrop-blur-sm border border-slate-100 rounded-xl p-8 flex items-center justify-center min-h-[110px] sm:min-h-[130px] transition-all duration-300 ease-in-out hover:bg-white hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={retailer.image}
                      alt={`${retailer.name} logo`}
                      width={120}
                      height={60}
                      className="w-auto h-auto object-contain transition-all duration-500 ease-out group-hover/partner:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Container>
    </section>
  );
}
