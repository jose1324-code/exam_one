"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedCheckmark({ size = 100 }: { size?: number }) {
  const reduce = useReducedMotion();
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <motion.div
      initial={reduce ? {} : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative grid place-items-center rounded-full"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-accent"
        initial={false}
        animate={reduce ? {} : { boxShadow: ["0 0 0 0 rgba(255,111,0,0.35)", "0 0 0 20px rgba(255,111,0,0.12)", "0 0 0 0 rgba(255,111,0,0.35)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <svg width={size} height={size} viewBox="0 0 100 100">
        <motion.circle
          cx="50" cy="50" r={r}
          fill="rgba(255,111,0,0.12)"
          stroke="#FF6F00" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? {} : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          transform="rotate(-90 50 50)"
        />
        <motion.path
          d="M32 52 L45 65 L69 38"
          fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
          initial={reduce ? {} : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        />
      </svg>
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        animate={reduce ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
