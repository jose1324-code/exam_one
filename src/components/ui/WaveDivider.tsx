"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  variant?: "wave" | "peak";
  fill?: string;
  flip?: boolean;
  className?: string;
};

/** Decorative SVG section divider. Pass the fill of the section BELOW the divider. */
export default function WaveDivider({ variant = "wave", fill = "#ffffff", flip = false, className = "" }: Props) {
  const reduce = useReducedMotion();
  const d =
    variant === "wave"
      ? "M0,40 C360,80 720,0 1440,40 L1440,80 L0,80 Z"
      : "M0,20 Q360,60 720,20 Q1080,-20 1440,20 L1440,80 L0,80 Z";
  return (
    <div aria-hidden className={`-mb-px w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <motion.svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-[44px] w-full md:h-[64px]"
        initial={reduce ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.path d={d} fill={fill} initial={false} />
      </motion.svg>
    </div>
  );
}
