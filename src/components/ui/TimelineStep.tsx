"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  icon: string;
  title: string;
  dotColor: string;
  delay: number;
  last?: boolean;
};

export default function TimelineStep({ icon, title, dotColor, delay, last = false }: Props) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex gap-4 pb-7 last:pb-0">
      {!last && (
        <motion.span
          aria-hidden
          className="absolute left-[15px] top-9 w-[3px] origin-top rounded-full bg-white/25"
          style={{ height: "calc(100% - 2rem)" }}
          initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.25 }}
        />
      )}
      <motion.span
        aria-hidden
        className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-base"
        style={{ background: dotColor }}
        initial={reduce ? {} : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 16, delay }}
      >
        {icon}
      </motion.span>
      <motion.p
        initial={reduce ? {} : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: delay + 0.12 }}
        className="pt-1 text-left text-[0.95rem] font-medium text-white"
      >
        {title}
      </motion.p>
    </div>
  );
}
