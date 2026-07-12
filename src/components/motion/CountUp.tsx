"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const endValue = target;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${target}${suffix}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
