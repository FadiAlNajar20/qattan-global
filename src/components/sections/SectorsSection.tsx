"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Container from "@/components/ui/Container";
import { motion, Variants } from "framer-motion";
import {
  ShoppingBag,
  Package,
  Truck,
  Globe,
  Home,
  Sparkles,
  Tag,
  Star,
  ArrowRight,
} from "lucide-react";
import type { Sector } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Package,
  Truck,
  Globe,
  Home,
  Sparkles,
  Tag,
  Star,
};

const sectorConfig: Record<
  string,
  { image: string; id: string; span: string }
> = {
  ShoppingBag: {
    image: "/images/retail.webp",
    id: "retail",
    span: "lg:col-span-1",
  },
  Package: {
    image: "/images/wholesale.webp",
    id: "wholesale",
    span: "lg:col-span-1",
  },
  Truck: {
    image: "/images/distribution.webp",
    id: "distribution",
    span: "lg:col-span-2",
  },
  Globe: {
    image: "/images/duty-free.webp",
    id: "duty-free",
    span: "lg:col-span-1",
  },
  Home: {
    image: "/images/home-appliances.webp",
    id: "home-appliances",
    span: "lg:col-span-1",
  },
  Sparkles: {
    image: "/images/perfumes-cosmetics.webp",
    id: "perfumes-cosmetics",
    span: "lg:col-span-2",
  },
  Tag: { image: "/images/fashion.webp", id: "fashion", span: "lg:col-span-2" },
  Star: {
    image: "/images/proprietary-brands.webp",
    id: "proprietary-brands",
    span: "lg:col-span-2",
  },
};

interface Props {
  eyebrow: string;
  title: string;
  sectors: Sector[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
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
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectorsSection({ eyebrow, title, sectors }: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <motion.section
      className="bg-[var(--color-bg-light)] py-24 sm:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      <Container>
        <motion.div variants={headerVariants} className="max-w-3xl mb-16">
          <p className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-4">
            {eyebrow || "WHAT WE DO"}
          </p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-tight">
            {title || "Industries we serve."}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[380px] lg:auto-rows-[420px]"
        >
          {sectors?.map((sector) => {
            const Icon = iconMap[sector.icon] ?? ShoppingBag;
            const config = sectorConfig[sector.icon] || {
              image: "/images/placeholder.webp",
              id: "sector",
              span: "lg:col-span-1",
            };

            return (
              <motion.div
                key={sector.title}
                variants={cardVariants}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative group overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900 ${config.span}`}
              >
                <Link
                  href={`/${locale}/sectors#${config.id}`}
                  className="relative block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-inset rounded-2xl"
                >
                  {/* Background Image with Cinematic Zoom */}
                  <Image
                    src={config.image}
                    alt={sector.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Reveal Content Container */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="translate-y-5 sm:translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 mb-3 sm:mb-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                          <Icon
                            className="w-6 h-6 text-amber-500"
                            strokeWidth={1.5}
                          />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {sector.title}
                        </h3>
                      </div>

                      {/* Expandable Description & Button */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                            {sector.description}
                          </p>
                          <span className="inline-flex items-center gap-2 text-amber-500 font-semibold text-sm tracking-wide uppercase">
                            Explore Sector
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </motion.section>
  );
}
