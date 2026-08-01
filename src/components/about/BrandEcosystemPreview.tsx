"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn, StaggerChildren, FadeInStaggerItem } from "../motion/FadeIn";
import Container from "../ui/Container";
import Link from "next/link";

interface Brand {
  name: string;
  url: string;
}

interface BrandCategory {
  title: string;
  brands: Brand[];
}

interface BrandEcosystemPreviewProps {
  content: {
    introduction: string;
    brandDetails: string;
    categories: BrandCategory[];
    cta: string;
  };
  locale: string;
}

export default function BrandEcosystemPreview({
  content,
  locale,
}: BrandEcosystemPreviewProps) {
  const [selectedBrand, setSelectedBrand] = useState<{
    name: string;
    url: string;
    category: string;
  } | null>(null);

  // Close panel on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedBrand(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="bg-[var(--color-bg-light)] relative">
      <Container className="section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Intro */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeIn>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[var(--color-text-dark)] mb-6">
                Brand Ecosystem
              </h2>
              <p className="text-[var(--color-text-dark-soft)] text-lg leading-relaxed mb-8">
                {content.introduction}
              </p>

              <Link
                href={`/${locale}/global-partnerships`}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full bg-[var(--color-text-dark)] text-[var(--color-bg-light)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:shadow-lg"
              >
                {content.cta}
              </Link>
            </FadeIn>
          </div>

          {/* Cards */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="bg-[var(--color-bg-light)] rounded-[2rem] border border-[var(--color-border-light)] p-6 md:p-10">
                <StaggerChildren className="flex flex-col gap-8">
                  {content.categories.map((cat, idx) => (
                    <FadeInStaggerItem
                      key={idx}
                      className="flex flex-col gap-4"
                    >
                      {cat.title && (
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
                          {cat.title}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {cat.brands.map((brand, bIdx) => (
                          <button
                            key={bIdx}
                            onClick={() =>
                              setSelectedBrand({
                                name: brand.name,
                                url: brand.url,
                                category: cat.title,
                              })
                            }
                            className="group flex items-center justify-between w-full px-5 py-4 bg-[var(--color-bg-light-dim)] rounded-xl border border-[var(--color-border-light)] transition-all duration-300 ease-out hover:border-[var(--color-accent)] hover:-translate-y-0.5 hover:shadow-md"
                            title={`View details for ${brand.name}`}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-8 h-8 rounded-full bg-[var(--color-bg-light)] shadow-sm flex items-center justify-center shrink-0 border border-[var(--color-border-light)] group-hover:border-[var(--color-accent)] transition-colors">
                                <span className="text-xs font-bold text-[var(--color-text-dark-soft)] group-hover:text-[var(--color-accent)]">
                                  {brand.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-[var(--color-text-dark)] group-hover:text-[var(--color-accent)] transition-colors text-left truncate">
                                {brand.name}
                              </span>
                            </div>
                            <span className="shrink-0 text-[var(--color-accent)] transition-all duration-300 ease-out">
                              →
                            </span>
                          </button>
                        ))}
                      </div>
                    </FadeInStaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>

      {/* Brand Details Drawer */}
      <AnimatePresence>
        {selectedBrand && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedBrand(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[var(--color-bg-light)] shadow-2xl flex flex-col border-l border-[var(--color-border)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-light)] gap-4">
                <h3 className="text-2xl font-black text-[var(--color-text-dark)] tracking-tight truncate">
                  {selectedBrand.name}
                </h3>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-bg-light-dim)] hover:bg-[var(--color-border)] transition-colors text-[var(--color-text-dark-soft)] hover:text-[var(--color-text-dark)]"
                  title="Close panel"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
                {/* Simulated Image Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="w-full aspect-[4/3] bg-[var(--color-bg-light-dim)] rounded-xl flex items-center justify-center border border-[var(--color-border-light)] shadow-inner p-8 overflow-hidden relative"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedBrand.url}
                    alt={selectedBrand.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-3">
                    {selectedBrand.category}
                  </span>
                  <p className="text-[var(--color-text-dark-soft)] text-lg leading-relaxed font-light">
                    {content.brandDetails
                      .split("{brandName}")
                      .map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <strong className="text-[var(--color-text-dark)] font-semibold">
                              {selectedBrand.name}
                            </strong>
                          )}
                        </span>
                      ))}
                  </p>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="p-6 border-t border-[var(--color-border-light)] bg-[var(--color-bg-light)] flex flex-col gap-3"
              >
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="w-full md:hidden py-3 rounded-lg text-sm font-semibold text-[var(--color-text-dark-soft)] border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-bg-light-dim)] transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
