"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import type { BrandTier } from "@/types";
import { brandLogos } from "@/content/brands";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  tiers: BrandTier[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
  visible: {
    clipPath: "inset(-20% 0 -20% 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", rotate: -2, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    rotate: 0,
    y: 0,
    scale: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BrandsSection({
  eyebrow,
  title,
  description,
  ctaText,
}: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const filterBrands = brandLogos.slice(0, 10);

  return (
    <motion.section 
      className="bg-[var(--color-bg-light-dim)] py-24 sm:py-32 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
    >
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <motion.div variants={headerVariants}>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              light={false}
            />
          </motion.div>
          <motion.div variants={headerVariants}>
            <Link
              href={`/${locale}/brands`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-text-sub-above)] hover:text-[var(--color-accent-hover)] transition-colors group shrink-0 whitespace-nowrap"
            >
              <span>{ctaText}</span>
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Brands Grid with Interactive Fade & Shift */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mt-10"
          variants={containerVariants}
        >
          {filterBrands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02, rotate: 0 }}
              className="bg-white border border-slate-100 rounded-xl p-6 flex items-center justify-center min-h-[140px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-200/80 group"
            >
              <div className="relative w-full h-full flex items-center justify-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <Image
                  src={brand.url}
                  alt={brand.name}
                  width={140}
                  height={70}
                  className="w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
