"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import { motion, useInView, Variants } from "framer-motion";
import { useParams } from "next/navigation";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  differentiators: {
    number: string;
    title: string;
    description: string;
  }[];
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

const blockVariants: Variants = {
  hidden: (isRtl: boolean) => ({ opacity: 0, x: isRtl ? -60 : 60, filter: "blur(12px)" }),
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function DifferentiatorsSection({
  eyebrow,
  title,
  description,
  differentiators,
}: Props) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isRtl = locale === "ar";

  return (
    <section className="bg-white py-24 sm:py-32 relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Panel (Sticky Showcase) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              className="lg:sticky lg:top-32 h-fit"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={leftVariants}
            >
              <p className="text-amber-500/90 font-semibold tracking-widest uppercase text-xs mb-4">
                {eyebrow}
              </p>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
                {title}
              </h2>
              {description && (
                <p className="text-slate-600 text-lg leading-relaxed">
                  {description}
                </p>
              )}
            </motion.div>
          </div>

          {/* Right Panel (Interactive Scroll Stream) */}
          <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-12 pb-16">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                custom={isRtl}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                variants={blockVariants}
              >
                <DifferentiatorBlock item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function DifferentiatorBlock({
  item,
}: {
  item: { number: string; title: string; description: string };
}) {
  const ref = useRef(null);
  // Trigger when the element crosses the middle 40% of the viewport vertically
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <div
      ref={ref}
      className={`relative p-8 lg:p-12 rounded-3xl transition-all duration-700 ease-out border ${
        isInView
          ? "bg-gradient-to-br from-slate-50/80 to-transparent border-slate-100/60 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)]"
          : "bg-transparent border-transparent opacity-60 grayscale-[30%]"
      }`}
    >
      {/* Dynamic Accent Line */}
      <div
        className={`absolute top-10 bottom-10 w-[3px] bg-amber-500 transition-all duration-700 ease-out ltr:left-0 ltr:rounded-r-full rtl:right-0 rtl:rounded-l-full ${
          isInView ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{ transformOrigin: "top" }}
      />

      {/* Progressive Big Number */}
      <div
        className={`text-4xl font-bold tracking-tighter mb-6 transition-colors duration-700 ${
          isInView ? "text-amber-500" : "text-slate-200"
        }`}
      >
        {item.number}
      </div>

      {/* Content */}
      <h3
        className={`text-2xl font-bold mb-4 transition-colors duration-700 tracking-tight ${
          isInView ? "text-slate-900" : "text-slate-500"
        }`}
      >
        {item.title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-lg">
        {item.description}
      </p>
    </div>
  );
}
