"use client";

import Image from "next/image";
import { brandLogos } from "@/content/brands";

// Split into two sets for seamless infinite scroll
const half = Math.ceil(brandLogos.length / 2);
const firstRow = brandLogos.slice(0, half);
const secondRow = brandLogos.slice(half);

function LogoRow({ logos, reverse }: { logos: typeof brandLogos; reverse?: boolean }) {
  const double = [...logos, ...logos]; // duplicate for seamless loop

  return (
    <div className="marquee-viewport overflow-hidden" aria-hidden="true">
      <div
        className="flex gap-6 marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {double.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-[var(--color-border-light)] px-4"
          >
            <Image
              src={brand.url}
              alt={brand.name}
              width={100}
              height={40}
              className="max-h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  label: string;
}

export default function BrandMarquee({ label }: Props) {
  return (
    <section
      aria-label={label}
      className="bg-[var(--color-bg-light-dim)] py-10 border-y border-[var(--color-border-light)] space-y-4 overflow-hidden"
    >
      <LogoRow logos={firstRow} />
      <LogoRow logos={secondRow} reverse />
    </section>
  );
}
