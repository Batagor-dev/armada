"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
}

export function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  format = (val) => val.toLocaleString("id-ID"), // default to Indonesian locale format
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = format(Math.floor(latest));
      }
    });
  }, [springValue, format]);

  return <span ref={ref} className={className}>{from}</span>;
}
