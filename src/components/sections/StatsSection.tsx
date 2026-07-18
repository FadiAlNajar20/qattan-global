"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Award, Handshake, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  light?: boolean;
}

const statsData = [
  {
    id: 1,
    icon: Calendar,
    target: 1951,
    prefix: "",
    suffix: "",
    title: "Established",
    description: "Our journey began from Amman",
  },
  {
    id: 2,
    icon: Award,
    target: 70,
    prefix: "+",
    suffix: "",
    title: "Years of Trust",
    description: "Seven decades of commercial vision",
  },
  {
    id: 3,
    icon: Handshake,
    target: 40,
    prefix: "+",
    suffix: "",
    title: "Global Partners",
    description: "World-class trusted brands",
  },
  {
    id: 4,
    icon: Users,
    target: 500,
    prefix: "+",
    suffix: "",
    title: "Team Members",
    description: "The heart and driving force of our group",
  },
];

function CountUpNumber({
  target,
  prefix,
  suffix,
}: {
  target: number;
  prefix: string;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number;
    const duration = 2500; // Increased for smoother deceleration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutExpo for ultra-smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection({ eyebrow, title, description }: Props) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const textRevealVariants: Variants = {
    hidden: { clipPath: "inset(100% 0 0 0)", y: 40, opacity: 0 },
    visible: {
      clipPath: "inset(-20% 0 -20% 0)",
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cinematicRevealVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      id="overview"
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Area */}
        {(eyebrow || title || description) && (
          <motion.div className="text-left max-w-5xl mb-16">
            {eyebrow && (
              <motion.p variants={textRevealVariants} className="text-[var(--color-text-sub-above)] font-semibold tracking-widest uppercase text-sm mb-3">
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <motion.h2 variants={textRevealVariants} className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold mb-4">
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p variants={textRevealVariants} className="text-gray-400 leading-relaxed">{description}</motion.p>
            )}
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cinematicRevealVariants}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 border border-gray-200 transition-colors duration-300 hover:border-gray-500 hover:bg-gray-50/80"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-500 mb-6 transition-all duration-300 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:scale-110">
                <stat.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>

              {/* Number */}
              <div className="text-4xl font-bold mb-2 tracking-tight">
                <CountUpNumber
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
