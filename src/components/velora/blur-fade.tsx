"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the animation starts */
  delay?: number;
  duration?: number;
  /** Direction the element enters from */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance travelled in px */
  offset?: number;
  /** Animate only the first time it enters the viewport */
  once?: boolean;
  inView?: boolean;
}


export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
}: BlurFadeProps) {
  const reducedMotion = useReducedMotion();

  // Render content visibly on the server; progressive effects never hide copy.
  return (
    <motion.div
      data-slot="blur-fade"
      className={cn(className)}
      initial={false}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { delay, duration, ease: [0.21, 0.47, 0.32, 0.98] }
      }
    >
      {children}
    </motion.div>
  );
}
