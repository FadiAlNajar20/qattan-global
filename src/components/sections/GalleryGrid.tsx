"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  images: GalleryImage[];
  closeLabel: string;
  nextLabel: string;
  prevLabel: string;
  imageAriaLabel: string;
  locale: string;
}

export default function GalleryGrid({
  images,
  closeLabel,
  nextLabel,
  prevLabel,
  imageAriaLabel,
  locale,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isRtl = locale === "ar";

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);
  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") isRtl ? next() : prev();
      if (e.key === "ArrowRight") isRtl ? prev() : next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prev, next, isRtl]);

  // Prevent scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
        role="list"
        aria-label={imageAriaLabel}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            role="listitem"
            onClick={() => open(i)}
            className="relative aspect-square overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] group"
            aria-label={img.alt}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-black/90 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={imageAriaLabel}
            onClick={close}
          >
            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                width={images[lightboxIndex].width}
                height={images[lightboxIndex].height}
                className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                priority
              />
            </motion.div>

            {/* Controls */}
            <button
              onClick={close}
              aria-label={closeLabel}
              className="absolute top-4 end-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); isRtl ? next() : prev(); }}
              aria-label={prevLabel}
              className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={22} aria-hidden="true" className="icon-dir" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); isRtl ? prev() : next(); }}
              aria-label={nextLabel}
              className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={22} aria-hidden="true" className="icon-dir" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 inset-x-0 text-center">
              <span className="text-xs text-white/60 tabular-nums">
                {lightboxIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
