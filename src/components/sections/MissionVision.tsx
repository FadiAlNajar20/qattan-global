"use client";

import Container from "@/components/ui/Container";
import { ArrowUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";

interface Props {
  missionEyebrow: string;
  missionTitle: string;
  missionBody: string;
  visionEyebrow: string;
  visionTitle: string;
  visionPoints: string[];
}

const leftVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
  visible: { 
    clipPath: "inset(-20% 0 -20% 0)",
    y: 0, 
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  },
};

const rightHeaderVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
  visible: { 
    clipPath: "inset(-20% 0 -20% 0)",
    y: 0, 
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
  },
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
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

export default function MissionVision({
  missionEyebrow,
  missionTitle,
  missionBody,
  visionEyebrow,
  visionPoints,
}: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const splitTitle = missionTitle
    .split(". ")
    .map((s, i, arr) => (i < arr.length - 1 ? s + "." : s));

  return (
    <motion.section 
      className="relative overflow-hidden bg-[var(--color-bg-light-dim)] dark:bg-slate-950 py-24 lg:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {/* Ultra-faint radial ambient glows */}
      <div className="absolute top-[-20%] start-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] pointer-events-none bg-amber-500/5 blur-[120px] rounded-[100%]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Editorial Mission Statement (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
            <motion.div variants={leftVariants}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/90 mb-6 block">
                {missionEyebrow}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif text-slate-900 dark:text-slate-50 tracking-tight leading-[1.1] mb-8 text-balance">
                <span className="font-light block">
                  {splitTitle[0] || missionTitle}
                </span>
                {splitTitle.length > 1 && (
                  <span className="font-bold block mt-3">
                    {splitTitle.slice(1).join(" ")}
                  </span>
                )}
              </h2>
              <p className="text-base lg:text-lg font-sans leading-relaxed text-slate-600 dark:text-slate-400 mb-12">
                {missionBody}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-50 hover:text-amber-500 dark:hover:text-amber-500 transition-colors group"
              >
                Corporate Philosophy
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 rtl:group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Vision Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <motion.div variants={rightHeaderVariants}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/90 mb-6 block">
                {visionEyebrow}
              </span>
              <h2 className="text-2xl lg:text-3xl font-serif text-slate-900 dark:text-slate-50 tracking-tight leading-tight mb-14 text-balance">
                Growth rooted in{" "}
                <span className="relative inline-block pb-1">
                  purpose.
                  <span className="absolute start-0 bottom-0 w-full h-[3px] bg-amber-500/80 rounded-full" />
                </span>
              </h2>
            </motion.div>

            <motion.ul 
              className="space-y-6" 
              role="list"
              variants={staggerContainerVariants}
            >
              {visionPoints.map((point, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <motion.li 
                    key={num}
                    variants={cardVariants}
                    className="group relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-2xl transition-all duration-500 ease-out hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300/80 dark:hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-black/20"
                  >
                    {/* Watermarked Narrative Depth */}
                    <div className="absolute bottom-[-10%] end-[-5%] text-[8rem] leading-none font-serif font-bold text-slate-100 dark:text-slate-800/50 opacity-50 select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.15] group-hover:-rotate-6 group-hover:text-slate-200/60 dark:group-hover:text-slate-800/80">
                      {num}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-amber-500 font-mono text-sm font-semibold tracking-widest">
                          [{num}]
                        </span>
                      </div>
                      <p className="text-base lg:text-lg font-sans leading-relaxed text-slate-600 dark:text-slate-400">
                        {point}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
