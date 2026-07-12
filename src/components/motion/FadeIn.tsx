"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, useReducedMotion, Variants } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 20,
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [inView, controls, once]);

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerChildren({ children, className, staggerDelay = 0.08, once = true }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FadeInStaggerItem({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <motion.div variants={fadeUpItem} className={className} title={title}>
      {children}
    </motion.div>
  );
}

