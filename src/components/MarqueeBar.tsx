"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ITEMS = ["📰 The Hindu Education", "📰 Times NIE", "📰 Deccan Chronicle"];

export default function MarqueeBar() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const row = [...ITEMS, ...ITEMS];
  return (
    <motion.div
      id="featured"
      initial={reduce ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`bg-primary py-[18px] text-white ${paused ? "marquee-paused" : ""}`}
    >
      <p className="mb-2 text-center font-grotesk text-xs uppercase tracking-[2px] opacity-80">
        As featured in — <em>Sample Media Logos, for illustration only</em>
      </p>
      <div className="overflow-hidden whitespace-nowrap" aria-hidden={!paused}>
        <div className="marquee-track font-poppins text-lg font-semibold">
          {row.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
          <span>⭐</span>
        </div>
      </div>
    </motion.div>
  );
}
